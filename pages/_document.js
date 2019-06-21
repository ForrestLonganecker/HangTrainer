import Document, { Head, Main, NextScript } from 'next/document';

// This is used to help SEO
// need to move <title>...</...> to _app.js 

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <script src="https://kit.fontawesome.com/4a506047cc.js"></script>
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
