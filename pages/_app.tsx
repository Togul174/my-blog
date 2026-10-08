import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import '../styles/globals.sass';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';

type NextPageWithLayout = NextPage & {
  layout?: 'admin';
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.layout === 'admin' ? AdminLayout : DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;