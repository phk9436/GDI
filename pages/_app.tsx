import GlobalStyle from 'styles/GlobalStyle';
import '../styles/nprogress.css';
import 'public/fonts/fonts.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
