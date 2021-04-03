import dynamic from 'next/dynamic';

import { ReactNode } from 'react';
import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Meta from './meta';
import Nav from './nav';
import { Post } from '@/models/contentful/Post';
import LeftFixed from './left-fixed';
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
  drawerPosts?: Post[];
  text?: string;
}

export default function Layout({
  preview,
  children,
  meta,
  revalEnv,
  drawerLeftChildren,
  leftFixedChildren,
  hideAdsense,
  drawerPosts,
  text,
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
        <Nav
          colorMode={colorMode}
          posts={drawerPosts ?? []}
          preview={preview}
          drawerLeftChildren={drawerLeftChildren}
          text={text}
        />

        <Box pt={16}>
          <Flex>
            <LeftFixed leftFixedChildren={leftFixedChildren} drawerPosts={drawerPosts} />
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
