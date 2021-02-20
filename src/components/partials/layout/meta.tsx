import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
import GetOGPImage from '@/lib/ogp-image'

interface Props {
  desc: string;
  title: string;
}

export default function Meta({desc,title}:Props) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f05d30" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff"></meta>
      <title>{SITE_NAME}</title>
      <meta
        name="description"
        content={desc}
      />
      <meta property="og:image" content={GetOGPImage(title)} />
      <title>{title == SITE_NAME ? SITE_NAME :(title + ' | ' + SITE_NAME)}</title>
    </Head>
  )
}
