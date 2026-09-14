import Head from 'next/head';
import Link from 'next/link';
import styles from './Article.module.sass';

export default function ArticlePage({ article }) {
  if (!article) {
    return (
      <div>
        <h1 className={styles.title}>Статья не найдена</h1>
        <Link href="/" className={styles.backLink}>← Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | Мой Блог</title>
        <meta name="description" content={article.description} />
      </Head>

      <article className={styles.article}>
        <Link href="/" className={styles.backLink}>← На главную</Link>

        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.meta}>
          <span>{article.author}</span>
          <span>•</span>
          <span>
            {article.date
              ? new Date(article.date).toLocaleDateString('ru-RU')
              : 'Дата неизвестна'}
          </span>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </article>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:3000/api/articles/${slug}`);

  if (res.status === 404) {
    return { notFound: true };
  }
  const article = await res.json();

  return {
    props: { article },
  };
}