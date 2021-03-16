import { Box } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

interface AdsenseProps {
  slot: string
  currentPath: any
}

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function Adsense(props: AdsenseProps) {

  // https://mao-tss.medium.com/fix-google-adsense-loading-issues-with-react-f338cbd61ac4
  const { currentPath } = props

  const enableAd = process.env.ENABLE_AD ?? false

  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
  })

  return (
    <Box key={currentPath} mx="auto" my={3}>
      {enableAd ? (<>
        <Box mb={2} color="gray.800">スポンサーリンク</Box>
        <ins className="adsbygoogle"
          style={{ "display": "block" }}
          data-ad-client={process.env.GOOGLE_AD_CLIENT}
          data-ad-slot={props.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </>) : (
        <span>Adsense無効化中</span>
      )}
    </Box>
  )
}