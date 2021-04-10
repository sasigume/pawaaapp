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
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  return (
    <Center key={asPath} mx="auto" my={4}>
      {enableAd ? (
        <>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', width: '300px', height: '250px' }}
            data-ad-client={process.env.GOOGLE_AD_CLIENT}
            data-ad-slot={slot}
            /* data-ad-format="auto" */
            /* data-full-width-responsive="true" */
          ></ins>
        </>
      ) : (
        <span>Adsense無効化中</span>
      )}
    </え>
  );
}
