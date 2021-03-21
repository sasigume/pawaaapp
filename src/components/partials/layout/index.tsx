import Meta from './meta'
import { ReactNode } from 'react'

import FloatShare from './float-share'
import LayoutFooter from './layout-footer'
import DrawerLeft from './drawer-left'
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
  leftFixedChildren?: ReactNode
  title: string
  desc: string
  tweetCount?: number
  revalEnv?: number
  platforms?: Platform[]
  heroImageUrl?: string
}

export default function Layout({ preview,
  children,
  drawerLeftChildren,
  leftFixedChildren,
  title,
  desc,
  tweetCount,
  revalEnv,
  platforms,
  heroImageUrl,
}: LayoutProps) {

  return (
    <>
      <Meta title={title} desc={desc} heroImageUrl={heroImageUrl} />
      <Box maxW="100vw" overflow="hidden">
        <Heading textAlign="center" px={4} py={6}>
          <LinkChakra href="/">
            <Box as="h1" textStyle="h3">{SITE_NAME}</Box>
            <Box color="gray.500" fontSize="1rem">since 2014</Box>
          </LinkChakra>

        </Heading>
        <main style={{ flexGrow: 1 }}>
          {children}
        </main>
        <LayoutFooter revalidate={revalEnv} />
        <DrawerLeft preview={preview}>
          {drawerLeftChildren}
        </DrawerLeft>
        <FloatShare count={tweetCount} text={title} />

        {leftFixedChildren && <LeftFixed preview={preview}>{leftFixedChildren}</LeftFixed>}

        {preview && (
          <Box zIndex={15} position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/exit-preview">プレビュー解除</Button>
          </Box>
        )}
      </Box>
    </>
  )
}