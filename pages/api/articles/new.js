const temporaryArticles = [];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  const { title, description, author, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: 'Поля "title" и "content" обязательны'
    });
  }

  const newArticle = {
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    description: description || '',
    author: author || 'Аноним',
    content,
    date: new Date().toISOString(),
  };

  temporaryArticles.push(newArticle);

  console.log('Новая статья (эмуляция):', newArticle);

  res.status(201).json({
    message: 'Статья успешно создана (эмуляция)',
    article: newArticle,
  });
}