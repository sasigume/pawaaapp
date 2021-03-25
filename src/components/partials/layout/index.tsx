import dynamic from 'next/dynamic';

import { ReactNode } from 'react';
import { SITE_NAME } from '@/lib/constants';
import { Box, Button, Heading } from '@chakra-ui/react';
// IMPORTANT: Drawer should not be imported dynamically
import DrawerLeft from './drawer-left';
import LinkChakra from '@/components/common/link-chakra';
import Meta from './meta';
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
  leftFixedChuldren?: ReactNode;
  hideAdsense?: boolean;
}

export default function Layout({
  preview,
  children,
  meta,
  revalEnv,
  drawerLeftChildren,
  leftFixedChuldren,
  hideAdsense,
}: LayoutProps) {
  if (hideAdsense) {
    console.info(`Layout: hiding adsense`);
  }
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
        <Heading textAlign="center" px={4} py={6}>
          <LinkChakra href="/">
            <Box as="h1" textStyle="h3">
              {SITE_NAME}
            </Box>
            <Box color="gray.500" fontSize="1rem">
              since 2014
            </Box>
          </LinkChakra>
        </Heading>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <LayoutFooter revalidate={revalEnv} />
        <DrawerLeft preview={preview}>{drawerLeftChildren}</DrawerLeft>
        {leftFixedChuldren && <LeftFixed>{leftFixedChuldren}</LeftFixed>}

        {preview && (
          <Box zIndex={15} position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/exit-preview">
              プレビュー解除
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
