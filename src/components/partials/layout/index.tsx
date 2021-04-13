import { ReactNode } from 'react';
import { Flex, Box, Button, useColorMode, Center } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Meta from './meta';

import { Post } from '@/models/contentful/Post';

import {
  ASIDE_WITDH,
  LAYOUT_MAXW,
  LAYOUT_PADDING,
  MAIN_WIDTH,
  NAV_HEIGHT,
} from '@/lib/chakra/styles';
import Nav from './nav';
import Aside from './aside';
import LayoutFooter from './layout-footer';

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
  asideChildren?: ReactNode;
  hideAdsense?: boolean;
  drawerPosts?: Post[];
}

export default function Layout({
  preview,
  children,
  meta,
  revalEnv,
  drawerLeftChildren,
  asideChildren,
  hideAdsense,
  drawerPosts,
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
                '.adWrapper': {
                  display: 'none',
                },
              }
            : {}
        }
        w="100vw"
      >
        <Nav
          maxW={LAYOUT_MAXW}
          colorMode={colorMode}
          posts={drawerPosts ?? []}
          preview={preview}
          drawerLeftChildren={drawerLeftChildren}
          hideAdsense={hideAdsense ?? false}
        />

        <Box pt={`${NAV_HEIGHT}px`}>
          <Flex
            mx="auto"
            maxWidth={{
              base: '100vw',
              lg: `${LAYOUT_MAXW}px`,
            }}
            minW={{
              base: '100vw',
              lg: `${LAYOUT_MAXW}px`,
            }}
            px={{ base: 3, md: 0 }}
            flexDirection="row-reverse"
          >
            <Box
              as="main"
              mx="auto"
              pt={8}
              overflowX="hidden"
              maxW={`${MAIN_WIDTH}px`}
              minW={{ base: '100%', md: `${MAIN_WIDTH}px` }}
              pl={{ base: 0, lg: `${LAYOUT_PADDING}px` }}
            >
              {children}
            </Box>
            <Aside w={ASIDE_WITDH} asideChildren={asideChildren} drawerPosts={drawerPosts} />
          </Flex>
          <LayoutFooter maxW={LAYOUT_MAXW} revalidate={revalEnv} />
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
