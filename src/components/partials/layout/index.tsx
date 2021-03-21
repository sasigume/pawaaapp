import dynamic from 'next/dynamic'

import { ReactNode } from 'react'
import { SITE_NAME } from '@/lib/constants'
import { Box, Button, Heading } from '@chakra-ui/react'
// IMPORTANT: Drawer should not be imported dynamically
import DrawerLeft from './drawer-left'

const Meta = dynamic(() => import('./meta'))
const LayoutFooter = dynamic(() => import('./layout-footer'))
const LinkChakra = dynamic(() => import('@/components/common/link-chakra'))
const LeftFixed = dynamic(() => import('./left-fixed'))

interface LayoutProps {
  preview: boolean
  children: ReactNode
  drawerLeftChildren?: ReactNode
  leftFixedChildren?: ReactNode
  title: string
  desc: string
  tweetCount?: number
  revalEnv?: number
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