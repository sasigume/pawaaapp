import { MAIN_WIDTH } from '@/lib/chakra/styles';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Adsense from 'react-adsense';
interface AdsenseProps {
  slot: string;
  path?: string;
  minWidth?: number;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
/* export default function AdsenseBox({ slot, minWidth }: AdsenseProps) {
  const { asPath } = useRouter();

  //const enableAd = process.env.ENABLE_AD ?? false;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
          window.adsbygoogle.push({});
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [asPath]);

  return (
    <Box
      textAlign="center"
      className="adWrapper"
      key={asPath}
      minWidth={`${minWidth ?? 320}px`}
      minH="250px"
      maxWidth={`${MAIN_WIDTH}px`}
      mx="auto"
      my={4}
    >
      <div
        style={{
          minWidth: `${minWidth ?? 320}px`,
          minHeight: '250px',
          maxWidth: `${MAIN_WIDTH}px`,
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={process.env.GOOGLE_AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </Box>
  );
}*/

export default function AdsenseBox({ slot, minWidth }: AdsenseProps) {
  const { asPath } = useRouter();

  return (
    <Box
      textAlign="center"
      className="adWrapper"
      key={asPath}
      minWidth={`${minWidth ?? 320}px`}
      minH="250px"
      maxWidth={`${MAIN_WIDTH}px`}
      mx="auto"
      my={4}
    >
      <Adsense.Google
        client={process.env.GOOGLE_AD_CLIENT}
        slot={slot}
        style={{ display: 'block', textAlign: 'center' }}
      />
    </Box>
  );
}
