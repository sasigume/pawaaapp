import dynamic from 'next/dynamic';

import { ReactNode } from 'react';
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Meta from './meta';
import Nav from './nav';
const LayoutFooter = dynamic(() => import('./layout-footer'));

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  drawerLeftChildren?: ReactNode;
  meta: {
    title: string;
    desc: string;
    ogpUrl?: string;
  };
  revalEnv?: number;
  leftFixedChildren?: ReactNode;
  hideAdsense?: boolean;
}

export default function Layout({
  preview,
  children,
  meta,
  revalEnv,
  drawerLeftChildren,
  leftFixedChildren,
  hideAdsense,
}: LayoutProps) {
  if (hideAdsense) {
    console.info(`Layout: hiding adsense`);
  }
  const { colorMode } = useColorMode();
  return (
    <>
      <Meta title={meta.title} desc={meta.desc} heroImageUrl={meta.ogpUrl} />
      <Box
        sx={
          hideAdsense
            ? {
                '.adsbygoogle': {
                  display: 'none',
                },
                '.google-auto-placed': {
                  display: 'none',
                },
              }
            : {}
        }
        maxW="100vw"
        overflow="hidden"
      >
        <Nav preview={preview} drawerLeftChildren={drawerLeftChildren} />

        <Box pt={16}>
          <Flex>
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
              pt={24}
              position="fixed"
              zIndex={5}
              shadow="lg"
            >
              <Box w="full">
                {leftFixedChildren}
                <Button as={LinkChakra} colorScheme="blackAlpha" href="/contact/">
                  お問い合わせ
                </Button>
              </Box>
            </Box>
            <Box ml={{ base: 0, lg: '288px' }} flexGrow={1} as="main" pt={8}>
              {children}
              <LayoutFooter revalidate={revalEnv} />
            </Box>
          </Flex>
        </Box>

        {preview && (
          <Box zIndex={15} position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/preview?exit=yes">
              プレビュー解除
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
