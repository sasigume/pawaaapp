import { ReactNode } from 'react';
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import PostList from '../../post';
import ColorSwitch from '../color-switch';
import { Post } from '@/models/contentful/Post';

interface LeftFixedProps {
  leftFixedChildren?: ReactNode;
  drawerPosts?: Post[];
}

const LeftFixed = ({ leftFixedChildren, drawerPosts }: LeftFixedProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box sx={{ '.noScrollBar::-webkit-scrollbar': { display: 'none' } }}>
      <Box
        display={{ base: 'none', lg: 'flex' }}
        w="18rem"
        h="100vh"
        overflowY="scroll"
        bg={colorMode == 'light' ? 'gray.100' : 'black'}
        top={0}
        bottom={0}
        left={0}
        p={3}
        pt={16}
        position="fixed"
        zIndex={5}
        shadow="lg"
        className="noScrollBar"
      >
        <Box w="full">
          <ColorSwitch />
          {leftFixedChildren}
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

export default LeftFixed;
