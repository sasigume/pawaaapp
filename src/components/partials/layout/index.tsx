import Meta from './meta'
import { ReactNode } from 'react'

import FloatShare from './float-share'
import LayoutFooter from './layout-footer'
import DrawerLeft from './drawer-left'
import DrawerRight from './drawer-right'
import { Box, Button, Center, Divider, Heading, Stack, useColorMode } from '@chakra-ui/react'
import LinkChakra from '@/components/common/link-chakra'
import { SITE_NAME } from '@/lib/constants'
import { Platform } from '@/models/contentful/Platform'
import PlatformList from '../post/common/platform-list'
import Image from 'next/image'

interface LayoutProps {
  preview: boolean
  children: ReactNode
  drawerLeftChildren?: ReactNode
  drawerRightChildren?: ReactNode
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
  title,
  desc,
  tweetCount,
  revalEnv,
  platforms
}: LayoutProps) {

  const { colorMode } = useColorMode()

  return (
    <>
      <Meta title={title} desc={desc} />
      <Box pt={0}>
        <Heading mb={4}>
          <Center>
            <Stack whiteSpace="normal">
              <LinkChakra position="relative" h={256} href="/" mb={2}>
                <Image width={256} height={256} src="/logo3-512x.png" />
                <Box position="absolute" bottom={0} as="h1" textStyle="h4">ナポアン<br />の<br />マイクラ</Box>
              </LinkChakra>
            </Stack>
          </Center>
        </Heading>
        <Divider my={4} borderWidth={4} borderColor="blue.500" />
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

        {preview && (
          <Box position="fixed" bottom={0} left={0}>
            <Button as={LinkChakra} href="/api/exit-preview">プレビュー解除</Button>
          </Box>
        )}
      </Box>
    </>
  )
}