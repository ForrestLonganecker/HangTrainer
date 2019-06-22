import Document, { Head, Main, NextScript } from 'next/document';

// This is used to help SEO
// need to move <title>...</...> to _app.js 

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <script src="https://kit.fontawesome.com/4a506047cc.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet"></link>
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
