import type { ReactNode } from 'react';
import Link from 'next/link';
import styles from './AdminLayout.module.sass';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.adminLayout}>
      <header className={styles.adminHeader}>
        <div className={`container ${styles.adminContainer}`}>
          <Link href="/" className={styles.backLink}>
            ← На главную
          </Link>
          <h1 className={styles.adminTitle}>Панель управления</h1>
        </div>
      </header>
      <main className={styles.adminMain}>{children}</main>
    </div>
  );
}