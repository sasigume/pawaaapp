import '../styles/globals.css'

import { AppProps } from 'next/app'

import { AuthProvider } from '../context/auth'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App