import { getAllArticles } from '../../../lib/articles';
import { temporaryArticles } from '../../../lib/store';

function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'article';
}

function makeUniqueSlug(title) {
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

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Тело запроса должно быть JSON' });
  }

  const { title, description, author, content } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ message: 'Поле "Заголовок" обязательно' });
  }
  if (!content?.trim()) {
    return res.status(400).json({ message: 'Поле "Содержание" обязательно' });
  }

  const newArticle = {
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