import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

interface AdsenseProps {
  slot: string;
  path?: string;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function Adsense({ slot, path }: AdsenseProps) {
  // https://mao-tss.medium.com/fix-google-adsense-loading-issues-with-react-f338cbd61ac4

  const enableAd = process.env.ENABLE_AD ?? false;

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  });

  return (
    <Box key={path + Math.random().toString()} mx="auto" my={4}>
      {enableAd ? (
        <>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={process.env.GOOGLE_AD_CLIENT}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </>
      ) : (
        <span>Adsense無効化中</span>
      )}
    </Box>
  );
}
