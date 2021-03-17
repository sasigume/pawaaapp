import Meta from './meta'
import { ReactNode } from 'react'

import FloatShare from './float-share'
import LayoutFooter from './layout-footer'
import DrawerLeft from './drawer-left'
import DrawerRight from './drawer-right'
import { Box, Button, Divider, Heading } from '@chakra-ui/react'
import LinkChakra from '@/components/common/link-chakra'
import { SITE_NAME } from '@/lib/constants'
import { Platform } from '@/models/contentful/Platform'
import PlatformList from '../post/common/platform-list'
import LeftFixed from './left-fixed'

interface LayoutProps {
  preview: boolean
  children: ReactNode
  drawerLeftChildren?: ReactNode
  drawerRightChildren?: ReactNode
  leftFixedChildren?: ReactNode
  title: string
  desc: string
  tweetCount?: number
  revalEnv?: number
  platforms?: Platform[]
}

export default function Layout({ preview,
  children,
  drawerLeftChildren,
  drawerRightChildren,
  leftFixedChildren,
  title,
  desc,
  tweetCount,
  revalEnv,
  platforms
}: LayoutProps) {
  return (
    <>
      <Meta title={title} desc={desc} />
      <Box pt={0}>
        <Heading textAlign="center" mb={4} px={4} py={6} borderBottom="solid" borderBottomWidth={4} borderBottomColor="gray.500">
          <LinkChakra href="/">
            <Box as="h1" textStyle="h4">{SITE_NAME}</Box>
          </LinkChakra>

        </Heading>
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
        <LayoutFooter />
        {drawerLeftChildren && <DrawerLeft preview={preview}>
          {drawerLeftChildren}
        </DrawerLeft>}
        <DrawerRight preview={preview}>
          {platforms && (
            <Box>
              <PlatformList platforms={platforms} />
              <Divider mb={2} />
            </Box>
          )}
          {drawerRightChildren}
        </DrawerRight>
        <FloatShare count={tweetCount} text={title} />

        {leftFixedChildren && <LeftFixed preview={preview}>{leftFixedChildren}</LeftFixed>}

        {preview && (
          <Box position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/exit-preview">プレビュー解除</Button>
          </Box>
        )}
      </Box>
    </>
  )
}