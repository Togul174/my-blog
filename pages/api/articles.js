import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    const filenames = fs.readdirSync(articlesDirectory);
    const articles = filenames.map((filename) => {

      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Без названия',
        description: data.description || '',
        date: data.date || null,
        author: data.author || 'Неизвестный автор',
      };
    });

    articles.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    res.status(200).json(articles);
  } catch (error) {
    console.error('Ошибка при чтении статей:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}