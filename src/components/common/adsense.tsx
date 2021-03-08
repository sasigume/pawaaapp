import React, { useEffect } from 'react';

// https://qiita.com/qrusadorz/items/14972b6e069feaf777a9
export default function Adsense(props: any) {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
      window.adsbygoogle.push({});
    }
  }, [])

  return (
    <ins className="adsbygoogle"
      style={{ "display": "block" }}
      data-ad-client={process.env.GOOGLE_AD_CLIENT}
      data-ad-slot={process.env.GOOGLE_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}