import { MAIN_WIDTH } from '@/lib/chakra/styles';
import { Center } from '@chakra-ui/layout';
import { SkeletonText } from '@chakra-ui/skeleton';
import { useEffect, useRef, useState } from 'react';

interface AdsenseProps {
  slot: string;
  path: string;
}

export default function AdsenseBox({ slot, path }: AdsenseProps) {
  const enableAd = process.env.ENABLE_AD ?? 'false';
  const [loading, setLoading] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);
  const ins = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (enableAd !== 'false' && wrapper.current && wrapper.current.clientWidth > 0) {
        setTimeout(() => {
          pushAd();
        }, 500);
      }
    }
  }, [path]);

  const pushAd = () => {
    setLoading(false);
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({
      google_ad_client: process.env.GOOGLE_AD_CLIENT,
    });
  };

  return (
    <>
      <Center key={Math.random().toString() + path} mx="auto" my={4} textAlign="center">
        <div ref={wrapper} style={{ minHeight: '250px', minWidth: '320px' }}>
          {enableAd !== 'false' ? (
            <>
              {loading == true ? (
                <SkeletonText spacing={4} noOfLines={12} w="full" h="full" />
              ) : (
                <ins
                  ref={ins}
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
