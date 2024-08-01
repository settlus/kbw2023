import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <meta
            name='description'
            content='See pictures from the Settlus x Circle Networking Night.'
          />
          <meta property='og:site_name' content='kbw2023.settlus.org' />
          <meta
            property='og:description'
            content='See pictures from the Settlus x Circle Networking Night.'
          />
          <meta property='og:title' content='KBW 2023 Pictures' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='KBW 2023 Pictures' />
          <meta
            name='twitter:description'
            content='See pictures from the Settlus x Circle Networking Night.'
          />
        </Head>
        <body className='bg-black antialiased'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
