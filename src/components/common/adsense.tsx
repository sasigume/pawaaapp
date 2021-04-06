import { MAIN_WIDTH } from '@/lib/chakra/styles';
import { Center } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/skeleton';
import { useEffect, useState } from 'react';

interface AdsenseProps {
  slot: string;
}

export default function AdsenseBox({ slot }: AdsenseProps) {
  const enableAd = process.env.ENABLE_AD ?? 'false';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enableAd !== 'false') {
      setTimeout(() => {
        pushAd().catch((e) => console.error(e));
      }, 1000);
    }
  }, []);

  const pushAd = async () => {
    if (typeof window !== 'undefined') {
      setLoading(false);
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({
        google_ad_client: process.env.GOOGLE_AD_CLIENT,
      });
    }
  };

  return (
    <>
      <Center
        key={Math.random()}
        mx="auto"
        my={4}
        minH="250px"
        w={{ base: '320px', md: `${MAIN_WIDTH}px` }}
        textAlign="center"
      >
        <div style={{ minHeight: '250px', minWidth: '320px' }}>
          {enableAd !== 'false' ? (
            <>
              {loading == true ? (
                <SkeletonText spacing={4} noOfLines={12} w="full" h="full" />
              ) : (
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client={process.env.GOOGLE_AD_CLIENT}
                  data-ad-slot={slot}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              )}
            </>
          ) : (
            <span>Adsense無効化中</span>
          )}
        </div>
      </Center>
    </>
  );
}
