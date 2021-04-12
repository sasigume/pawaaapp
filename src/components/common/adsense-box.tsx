import { Center } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface AdsenseProps {
  slot: string;
  path?: string;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function AdsenseBox({ slot, path }: AdsenseProps) {
  const { asPath } = useRouter();

  const enableAd = process.env.ENABLE_AD ?? false;

  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  return (
    <Center key={asPath} minW="320px" minH="250px" mx="auto" my={4}>
      {enableAd ? (
        <>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', minWidth: '300px', minHeight: '250px' }}
            data-ad-client={process.env.GOOGLE_AD_CLIENT}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </>
      ) : (
        <span>Adsense無効化中</span>
      )}
    </Center>
  );
}
