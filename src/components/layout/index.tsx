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
} from '@/lib/chakra/theme';
import Nav from './nav';
import Aside from './aside';
import LayoutFooter from './layout-footer';

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  meta: {
    title: string;
    desc: string;
    ogpUrl?: string;
  };
  revalEnv?: number;
  hideAdsense?: boolean;
  post?: Post;
}

export default function Layout({
  preview,
  children,
  meta,
  revalEnv,
  hideAdsense,
  post,
}: LayoutProps) {
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
          post={post}
          maxW={LAYOUT_MAXW}
          colorMode={colorMode}
          preview={preview}
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
            <Aside post={post} hideAdsense={hideAdsense ?? false} w={ASIDE_WITDH} />
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
