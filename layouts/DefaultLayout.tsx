import type { ReactNode } from 'react';
import Header from '../components/Header/Header';
import styles from './DefaultLayout.module.sass';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
}