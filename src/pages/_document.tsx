import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ColorModeScript } from "@chakra-ui/react"

import colorMode from '@/lib/chakra/color-mode'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps
    }
  }


  render() {
    return (
      <Html>
        <Head>


        </Head>
        <body>
          {/* for Adsense */}
          <noscript dangerouslySetInnerHTML={{
            __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID ?? ''}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
          }} />

          {/* dark mode */}
          <ColorModeScript initialColorMode={colorMode.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}