import { Box } from '@chakra-ui/layout';
import { Component } from 'react';

interface AdsenseProps {
  slot: string;
}

export default class AdsenseBox extends Component<AdsenseProps, { enableAd: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      enableAd: process.env.ENABLE_AD ?? 'false',
    };
  }
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', this.loadAd);
    }
  }

  componentDidUpdate() {
    this.loadAd();
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.loadAd);
    }
  }

  loadAd = () => {
    if (this.state.enableAd !== 'false') {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      console.log(`Ad component pushed`);
    }
  };

  render() {
    return (
      <>
        <Box key={Math.random()} my={4}>
          {this.state.enableAd !== 'false' ? (
            <>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={process.env.GOOGLE_AD_CLIENT}
                data-ad-slot={this.props.slot}
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
}
