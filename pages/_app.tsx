import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
