import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './Admin.module.sass';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/articles/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, author, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.message || 'Ошибка при создании статьи');
        return;
      }

      setMessage(`Статья "${data.article.title}" создана! (slug: ${data.article.slug})`);

      setTitle('');
      setDescription('');
      setAuthor('');
      setContent('');
    } catch (error) {
      setIsError(true);
      setMessage('Ошибка сети: ' + error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Управление блогом | Мой Блог</title>
        <meta name="description" content="Панель управления блогом" />
      </Head>

      <div className={`container ${styles.adminContainer}`}>
        <h2 className={styles.addPost}>Добавить статью</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Заголовок..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Краткое описание</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="author">Автор</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Иван Иванов..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Содержание</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              placeholder="Содержание..."
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Создать статью
          </button>
        </form>
        {message && (
          <div className={isError ? styles.error : styles.success}>
            {message}
          </div>
        )}
      </div>
    </>
  );
}

AdminPage.layout = 'admin';