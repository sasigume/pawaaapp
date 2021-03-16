import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ColorModeScript } from "@chakra-ui/react"

import { GA_TRACKING_ID } from '@/lib/gtag'
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
          <script
            async={true}
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <script data-ad-client={process.env.GOOGLE_AD_CLIENT} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script dangerouslySetInnerHTML={{
              __html: `
              (adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "${process.env.GOOGLE_AD_CLIENT}",enable_page_level_ads: true});
              `}}
          />
        </Head>
        <body>
          {/* dark mode */}
          <ColorModeScript initialColorMode={colorMode.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}