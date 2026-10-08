import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { temporaryArticles } from './store';
import type { Article, ArticlePreview } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): ArticlePreview[] {
  let fileArticles: ArticlePreview[] = [];

  if (fs.existsSync(articlesDirectory)) {
    const filenames = fs.readdirSync(articlesDirectory);
    fileArticles = filenames
      .filter((f) => f.endsWith('.md'))
      .map((filename) => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Без названия',
          description: data.description || '',
          date: data.date ? data.date.toString() : null,
          author: data.author || 'Неизвестный автор',
        };
      });
  }

  const tempPreviews: ArticlePreview[] = temporaryArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    date: a.date,
    author: a.author,
  }));

  const all: ArticlePreview[] = [...fileArticles, ...tempPreviews];

  all.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return all;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processed = await remark().use(html).process(content);

    return {
      slug,
      title: data.title || 'Без названия',
      description: data.description || '',
      date: data.date ? data.date.toString() : null,
      author: data.author || 'Неизвестный автор',
      contentHtml: processed.toString(),
    };
  }

  const tempArticle = temporaryArticles.find((a) => a.slug === slug);
  if (tempArticle) {
    const processed = await remark().use(html).process(tempArticle.content);

    return {
      slug: tempArticle.slug,
      title: tempArticle.title,
      description: tempArticle.description,
      date: tempArticle.date,
      author: tempArticle.author,
      contentHtml: processed.toString(),
    };
  }

  return null;
}

export function getAllSlugs(): string[] {
  const fileSlugs = fs.existsSync(articlesDirectory)
    ? fs.readdirSync(articlesDirectory)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''))
    : [];

  const tempSlugs = temporaryArticles.map((a) => a.slug);
  return [...new Set([...fileSlugs, ...tempSlugs])];
}