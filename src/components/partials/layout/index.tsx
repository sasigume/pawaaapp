import dynamic from 'next/dynamic';

import { ReactNode } from 'react';
import { Flex, Box, Button, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Meta from './meta';
import Nav from './nav';
import { Post } from '@/models/contentful/Post';
import Aside from './aside';
import { ASIDE_WITDH, LAYOUT_MAXW, LAYOUT_PADDING, MAIN_WIDTH } from '@/lib/chakra/styles';
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
  asideChildren?: ReactNode;
  hideAdsense?: boolean;
  drawerPosts?: Post[];
  text?: string;
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
  text,
}: LayoutProps) {
  if (hideAdsense) {
    console.info(`Layout: hiding adsense`);
  }
  const { colorMode } = useColorMode();

  const navHeight = 56;

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
      >
        <Nav
          maxW={LAYOUT_MAXW}
          h={navHeight}
          colorMode={colorMode}
          posts={drawerPosts ?? []}
          preview={preview}
          drawerLeftChildren={drawerLeftChildren}
          text={text}
        />

        <Box pt={`${navHeight}px`}>
          <Flex
            mx="auto"
            maxWidth={{
              base: '100vw',
              lg: `${LAYOUT_MAXW}px`,
            }}
            px={{ base: 3, md: 0 }}
          >
            <Aside w={ASIDE_WITDH} asideChildren={asideChildren} drawerPosts={drawerPosts} />
            <Box
              as="main"
              mx="auto"
              pt={8}
              maxW={`${MAIN_WIDTH}px`}
              minW={{ base: '100%', md: `${MAIN_WIDTH}px` }}
              pl={{ base: 0, lg: `${LAYOUT_PADDING}px` }}
            >
              {children}
            </Box>
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
