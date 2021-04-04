import { Box } from '@chakra-ui/layout';

interface AdsenseProps {
  slot: string;
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function AdsenseBox({ slot }: AdsenseProps) {
  const enableAd = process.env.ENABLE_AD ?? 'false';

  return (
    <>
      <Box key={Math.random()} my={4}>
        {enableAd !== 'false' ? (
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
    </>
  );
}
