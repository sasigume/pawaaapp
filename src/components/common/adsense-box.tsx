import { MAIN_WIDTH } from '@/lib/chakra/styles';
import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
interface AdsenseProps {
  slot: string;
  path?: string;
  minWidth?: number;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function AdsenseBox({ slot, minWidth }: AdsenseProps) {
  const { asPath } = useRouter();

  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && insRef.current?.style.display == 'block') {
      setTimeout(() => {
        try {
          if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
            window.adsbygoogle.push({});
          }
          console.info(`Ad pushed in component`);
        } catch (err) {
          console.error(err);
        }
      }, 1000);
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
          ref={insRef}
          className="adsbygoogle"
          style={{
            minWidth: `${minWidth ?? 320}px`,
            minHeight: '250px',
            maxWidth: `${MAIN_WIDTH}px`,
            display: 'block',
            textAlign: 'center',
          }}
          data-ad-client={process.env.GOOGLE_AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </Box>
  );
}
