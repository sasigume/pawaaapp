import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
interface Props {
  desc: string;
  title: string;
}

function trimText(text:string) {
  const body = text.trim().replace(/[ \r\n]/g, '')
  if (body.length < 140) {
    return body
  }
  return body.substring(0, 140) + '...'
}

export default function Meta({ desc, title }: Props) {
  const ogpUrl = process.env.HTTPS_URL + '/api/ogpgen/?text=' + encodeURIComponent(trimText(title))
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
      <meta property="og:title" key="ogTItle" content={title} />
      <meta property="og:site_name" key="ogSiteName" content={title} />
      <meta
        property="og:description"
        key="ogDescription"
        content={desc}
      />
      <meta
        name="description"
        content={desc}
      />

      <meta property="og:image" content={ogpUrl} />
      <meta property="og:image" key="ogImage" content={ogpUrl} />
      <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
      <meta name="twitter:image" key="twitterImage" content={ogpUrl} />

      <title>{title == SITE_NAME ? SITE_NAME : (title + ' | ' + SITE_NAME)}</title>
    </Head>
  )
}
