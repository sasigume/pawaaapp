import { ReactNode } from 'react';
import { Box, Button } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import PostList from '../../post';
import { Post } from '@/models/contentful/Post';
import { ASIDE_WITDH, NAV_HEIGHT } from '@/lib/chakra/styles';
import AdsenseBox from '@/components/common/adsense-box';

interface LeftStickyProps {
  w: number;
  asideChildren?: ReactNode;
  drawerPosts?: Post[];
  enableAd?: boolean;
  hideAdsense?: boolean;
}

const Aside = ({ w, asideChildren, drawerPosts, enableAd, hideAdsense }: LeftStickyProps) => {
  return (
    <Box
      top={`${NAV_HEIGHT}px`}
      bottom={0}
      left={0}
      position="sticky"
      as="aside"
      sx={{ '.noScrollBar::-webkit-scrollbar': { display: 'none' } }}
      display={{ base: 'none', lg: 'flex' }}
      w={`${w}px`}
      h="100vh"
      zIndex={5}
    >
      <Box w="full" h="full" overflowY="scroll" className="noScrollBar">
        <Box w="full">
          <Box mt={6}>{asideChildren}</Box>
          {hideAdsense != true && <AdsenseBox minWidth={ASIDE_WITDH} slot={'8321176059'} />}
          {drawerPosts && drawerPosts.length > 0 && (
            <Box mt={8}>
              <PostList mode="drawer" posts={drawerPosts} enableAd={enableAd} />
            </Box>
          )}

          <Button w="full" mt={8} mb={10} colorScheme="blue" as={LinkChakra} href="/contact/">
            お問い合わせ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Aside;
