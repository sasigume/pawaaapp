import Meta from './meta'
import { ReactNode } from 'react'

import FloatShare from './float-share'
import LayoutFooter from './layout-footer'
import LayoutDrawer from './layout-drawer'
import { Box, Button, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import Logo from '@/components/common/Logo'
import { useRouter } from 'next/router'
import LinkChakra from '@/components/common/link-chakra'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  drawerChildren?: ReactNode,
  title: string;
  desc: string;
  tweetCount?: number;
}

export default function Layout({ preview, children, drawerChildren, title, desc,tweetCount }: LayoutProps) {

  const { colorMode } = useColorMode()

  return (
    <>
      <Meta title={title} desc={desc} />
      <Box w="full" h="full" py={10}>
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
        <LayoutFooter />
        <LayoutDrawer preview={preview}>
          {drawerChildren}
        </LayoutDrawer>
        <FloatShare count={tweetCount} text={title} />

        {preview && (
          <Box position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/exit-preview">プレビュー解除</Button>
          </Box>
        )}
      </Box>
    </>
  )
}