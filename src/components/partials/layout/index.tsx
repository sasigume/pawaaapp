import Meta from './meta'
import { ReactNode } from 'react'
import LayoutFooter from './layout-footer'
import LayoutDrawer from './layout-drawer'
import { Box, color, Flex, Spacer, useColorMode } from '@chakra-ui/react'
import Logo from '@/components/common/Logo'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  drawerChildren? : ReactNode,
  title: string;
  desc: string;
}

export default function Layout({ preview, children, drawerChildren, title, desc }: LayoutProps) {

  const { colorMode } = useColorMode()

  return (
    <>
      <Meta title={title} desc={desc} />
      <Box w="full" h="full">
        <Flex w="full" py={6} px={5} direction="row">
          <Spacer />
          <Logo fill={colorMode == "light" ? "#000" : "#fff"} />
        </Flex>
        <main style={{flexGrow: 1}}>
          {children}

        </main>
        <LayoutFooter />
        <LayoutDrawer preview={preview}>
          {drawerChildren}
        </LayoutDrawer>
      </Box>
    </>
  )
}