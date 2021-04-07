import { ReactNode } from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import PostList from '../../post';
import ColorSwitch from '../color-switch';
import { Post } from '@/models/contentful/Post';
import { NAV_HEIGHT } from '@/lib/chakra/styles';

interface LeftStickyProps {
  w: number;
  asideChildren?: ReactNode;
  drawerPosts?: Post[];
}

const Aside = ({ w, asideChildren, drawerPosts }: LeftStickyProps) => {
  return (
    <Box
      top={0}
      //top={`${NAV_HEIGHT}px`}
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
      <Box w="full" h="full" overflowY="scroll" p={3} className="noScrollBar">
        <Box w="full">
          <ColorSwitch />
          <Box mt={6}>{asideChildren}</Box>
          {drawerPosts && drawerPosts.length > 0 && (
            <Box mt={8}>
              <PostList mode="drawer" posts={drawerPosts} />
            </Box>
          )}

          <Button w="full" my={8} colorScheme="blue" as={LinkChakra} href="/contact/">
            お問い合わせ
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Aside;
