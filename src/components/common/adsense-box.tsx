import { MAIN_WIDTH } from '@/lib/chakra/styles';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface AdsenseProps {
  slot: string;
  path?: string;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function AdsenseBox({ slot }: AdsenseProps) {
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
      minW="320px"
      minH="250px"
      maxWidth={`${MAIN_WIDTH}px`}
      mx="auto"
      my={4}
    >
      <div style={{ minWidth: '320px', minHeight: '250px', maxWidth: `${MAIN_WIDTH}px` }}>
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
}
