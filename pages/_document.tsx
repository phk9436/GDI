import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="description" content="The North Gyeonggi Development Institute" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://gdin.re.kr/images/logoSns.png" />
          <meta property="og:description" content="The North Gyeonggi Development Institute" />
          <link rel="shortcut icon" type="image/png" sizes="16*16" href="/images/favi16.png" />
          <link rel="shortcut icon" type="image/png" sizes="32*32" href="/images/favi32.png" />
          <link rel="shortcut icon" type="image/png" sizes="96*96" href="/images/favi96.png" />
          <link rel="shortcut icon" type="image/png" sizes="180*180" href="/images/favi180.png" />
          <link rel="apple-touch-icon-precomposed" sizes="16*16" href="images/icon16.ico" />
          <link rel="apple-touch-icon-precomposed" sizes="32*32" href="images/icon32.ico" />
          <link rel="apple-touch-icon-precomposed" sizes="96*96" href="images/icon96.ico" />
          <link rel="apple-touch-icon-precomposed" sizes="180*180" href="images/icon180.ico" />
          <meta name="google-site-verification" content="Qxk7HlLin_MyjWFLgUQVvBuKz-TY5dKe12rOEmZvx8g" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
