import Head from 'next/head';
import Link from 'next/link';
import styles from './Article.module.sass';
import { getArticleBySlug } from '../../lib/articles';

export default function ArticlePage({ article, error }) {
  if (error) {
    return (
      <div>
        <h1 className={styles.title}>Ошибка</h1>
        <p className={styles.error}>{error}</p>
        <Link href="/" className={styles.backLink}>← Вернуться на главную</Link>
      </div>
    );
  }

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

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return { notFound: true };
    }

    return {
      props: {
        article,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        article: null,
        error: 'Не удалось загрузить статью',
      },
    };
  }
}