import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

import '@/lib/firebase'
import 'hooks/authentication'
import addIcon from '@/lib/fontawesome'
import * as gtag from '@/lib/gtag'
import { Chakra } from '@/components/providers/chakra'

function App({ Component, pageProps }: AppProps) {
  addIcon()

  // Google Analytics
  // https://sunday-morning.app/posts/2020-12-09-nextjs-google-analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({google_ad_client: gtag.ADSENSE_PUB,enable_page_level_ads: true})
        console.log('Adsense pushed!')
      } catch (err) {
        console.log(err);
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    
  }, [router.events])

  return (
    <RecoilRoot>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </RecoilRoot>
  )
}

export default App

// https://chakra-ui.com/docs/features/color-mode
export { getServerSideProps } from "@/components/providers/chakra"