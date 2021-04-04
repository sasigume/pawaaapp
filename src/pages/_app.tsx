import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { useCallback, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

import '@/lib/firebase';
import 'hooks/authentication';
import addIcon from '@/lib/fontawesome';
import { Chakra } from '@/components/providers/chakra';

function App({ Component, pageProps }: AppProps) {
  addIcon();

  let hideAdsense: boolean = pageProps.hideAdsense ?? false;

  if (hideAdsense) {
    console.info(`%c Adsense is disabled for this page`, `color:purple`);
  }

  useEffect(() => {
    if (typeof localStorage === null) {
      console.error('Cannot use Local Storage!');
    }
    TagManager.initialize({
      gtmId: process.env.GTM_ID,
      dataLayer: {
        hideAdsense: hideAdsense,
      },
    });
  });

  return (
    <RecoilRoot>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </RecoilRoot>
  );
}

export default App;

// https://chakra-ui.com/docs/features/color-mode
export { getServerSideProps } from '@/components/providers/chakra';
