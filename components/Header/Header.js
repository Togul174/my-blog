import Link from 'next/link';
import styles from './Header.module.sass';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          Мой Блог
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Главная</Link>
          <Link href="/admin">Управление блогом</Link>
        </nav>
      </div>
    </header>
  );
}