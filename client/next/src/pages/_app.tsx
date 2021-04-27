import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import NextNprogress from 'nextjs-progressbar';
import TagManager from 'react-gtm-module';
import * as gtag from '@/lib/gtag';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

import '@/lib/firebase';
import 'hooks/authentication';
import addIcon from '@/lib/fontawesome';
import { Chakra } from '@/components/providers/chakra';
import { useRouter } from 'next/router';
interface Props {
  shallow: boolean;
}

function App({ Component, pageProps }: AppProps) {
  addIcon();

  useEffect(() => {
    if (typeof localStorage === null) {
      console.error('Cannot use Local Storage!');
    }
    TagManager.initialize({
      gtmId: process.env.GTM_ID,
      dataLayer: {
        hideAdsense: false,
      },
    });
  });

  /* Analytics https://zenn.dev/okumura_daiki/articles/839685a90c06db */
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: Props) => {
      if (!shallow) {
        gtag.pageview(url);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <Chakra cookies={pageProps.cookies}>
        <NextNprogress color="#2687e8" startPosition={0.3} stopDelayMs={200} height={6} />
        <Component {...pageProps} />
      </Chakra>
    </RecoilRoot>
  );
}

export default App;

// https://chakra-ui.com/docs/features/color-mode
export { getServerSideProps } from '@/components/providers/chakra';
