import { getArticleBySlug } from '../../../lib/articles';

const SLUG_REGEX = /^[a-zа-я0-9-]+$/i;
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  const { slug } = req.query;

  if (!slug || !SLUG_REGEX.test(slug)) {
    return res.status(400).json({ message: 'Некорректный slug' });
  }

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Ошибка при чтении статьи:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}