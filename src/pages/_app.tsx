import '../styles/globals.css'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

import '@/lib/firebase'
import 'hooks/authentication'
import addIcon from '@/lib/fontawesome'

function App({ Component, pageProps }: AppProps) {
  addIcon()
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App