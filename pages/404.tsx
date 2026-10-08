import Link from 'next/link';
import Head from 'next/head';
import styles from './NotFound.module.sass';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 — Страница не найдена | Мой Блог</title>
        <meta name="description" content="Страница не найдена" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Страница не найдена</h2>
        <p className={styles.text}>
          Похоже, такой страницы не существует или она была удалена.
        </p>
        <Link href="/" className={styles.link}>
          ← Вернуться на главную
        </Link>
      </div>
    </>
  );
}