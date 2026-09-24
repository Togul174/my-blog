import Link from 'next/link';
import Head from 'next/head';
import styles from './Home.module.sass';
import { getAllArticles } from '../lib/articles';

export default function Home({ articles = [], error }) {
  return (
    <>
      <Head>
        <title>Мой Блог — Главная</title>
        <meta name="description" content="Мой блог" />
      </Head>

      <div>
        <h1 className={styles.title}>Список статей</h1>

        {error ? (
          <p className={styles.error}>{error}</p>
        ) : articles.length === 0 ? (
          <p className={styles.empty}>Статей пока нет</p>
        ) : (
          <ul className={styles.list}>
            {articles.map((article) => (
              <li key={article.slug} className={styles.card}>
                <Link href={`/articles/${article.slug}`} className={styles.cardTitle}>
                  {article.title}
                </Link>
                <p className={styles.cardDescription}>{article.description}</p>
                <small className={styles.cardMeta}>
                  {article.date
                    ? new Date(article.date).toLocaleDateString('ru-RU')
                    : 'Дата неизвестна'}
                  {' • '}
                  {article.author}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const articles = getAllArticles();
    return {
      props: {
        articles,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        articles: [],
        error: 'Не удалось загрузить статьи',
      },
    };
  }
}