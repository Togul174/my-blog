import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  const { slug } = req.query;

  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    const fullPath = path.join(articlesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    res.status(200).json({
      slug,
      title: data.title || 'Без названия',
      description: data.description || '',
      date: data.date || null,
      author: data.author || 'Неизвестный автор',
      contentHtml,
    });
  } catch (error) {
    console.error('Ошибка при чтении статьи:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}