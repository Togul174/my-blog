import Link from 'next/link';
import styles from './AdminLayout.module.sass';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <header className={styles.adminHeader}>
        <div className={`container ${styles.adminContainer}`}>
          <h1 className={styles.adminTitle}>Управление блогом</h1>
          <Link href="/" className={styles.backLink}>
            ← На главную
          </Link>
        </div>
      </header>
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}