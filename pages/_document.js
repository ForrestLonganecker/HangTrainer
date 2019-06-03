import Document, { Head, Main, NextScript } from 'next/document';

// This is used to help SEO

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>HangTrainer</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
