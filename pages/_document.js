import Document, { Head, Main, NextScript } from 'next/document';

// This is used to help SEO
// need to move <title>...</...> to _app.js 

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
