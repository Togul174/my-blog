import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllArticles } from '../../../lib/articles';
import { temporaryArticles } from '../../../lib/store';
import type { StoredArticle, CreateArticleDto, ApiError } from '../../../types/article';
import { makeSlug } from '../../../lib/slug';

function makeUniqueSlug(title: string): string {
  const baseSlug = makeSlug(title);

  const existingSlugs = [
    ...getAllArticles().map((a) => a.slug),
    ...temporaryArticles.map((a) => a.slug),
  ];

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

interface SuccessResponse {
  message: string;
  article: StoredArticle;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Тело запроса должно быть JSON' });
  }

  const { title, description, author, content } = req.body as CreateArticleDto;

  if (!title?.trim()) {
    return res.status(400).json({ message: 'Поле "title" обязательно' });
  }
  if (!content?.trim()) {
    return res.status(400).json({ message: 'Поле "content" обязательно' });
  }

  const newArticle: StoredArticle = {
    slug: makeUniqueSlug(title),
    title: title.trim(),
    description: description?.trim() || '',
    author: author?.trim() || 'Аноним',
    content: content.trim(),
    date: new Date().toISOString(),
  };

  temporaryArticles.push(newArticle);
  console.log('Статья:', newArticle);

  res.status(201).json({
    message: 'Статья создана',
    article: newArticle,
  });
}