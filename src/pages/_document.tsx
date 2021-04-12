import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import { GA_TRACKING_ID } from '@/lib/gtag';
import colorMode from '@/lib/chakra/color-mode';

interface DocumentProps {
  preview: boolean;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }

  render() {
    const preview = this.props.preview;

    return (
      <Html>
        <Head>
          {/* for GTM */}
          <script
            dangerouslySetInnerHTML={{
              __html: `dataLayer = [];`,
            }}
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });

                ${preview ? "window['ga-disable-" + GA_TRACKING_ID + "'] = true;" : ''}
        `,
            }}
          />
        </Head>
        <body>
          {/* dark mode */}
          <ColorModeScript initialColorMode={colorMode.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
