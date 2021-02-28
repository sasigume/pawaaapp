import '../styles/globals.css'
import '../styles/content.scss'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { ToastContainer } from 'react-toastify'

dayjs.locale('ja')

import '@/lib/firebase'
import 'hooks/authentication'
import addIcon from '@/lib/fontawesome'
import * as gtag from '@/lib/gtag'
import { ChakraProvider, extendTheme} from "@chakra-ui/react"

import colors from '@/lib/chakraui/colors'

function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({ colors })
  addIcon()

  // Google Analytics
  // https://sunday-morning.app/posts/2020-12-09-nextjs-google-analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer limit={1} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App