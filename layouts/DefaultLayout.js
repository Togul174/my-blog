import Header from '../components/Header/Header';
import styles from './DefaultLayout.module.sass';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
}