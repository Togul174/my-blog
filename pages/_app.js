import '../styles/globals.sass';
import '../styles/mixins.sass';
import '../styles/variables.sass';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout === 'admin' ? AdminLayout : DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
