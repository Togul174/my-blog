import { getAllArticles } from '../../lib/articles';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    const articles = getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Ошибка при чтении статей:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}