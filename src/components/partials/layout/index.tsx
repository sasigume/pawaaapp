import Meta from './meta'
import { ReactNode } from 'react'
import LayoutFooter from './layout-footer'
import LayoutDrawer from './layout-drawer'
import { Box } from '@chakra-ui/react'
import Logo from '@/components/common/Logo'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  drawerChildren? : ReactNode,
  title: string;
  desc: string;
}

export default function Layout({ preview, children, drawerChildren, title, desc }: LayoutProps) {
  return (
    <div>
      <Meta title={title} desc={desc} />
      <div className="w-screen flex flex-col items-center justify-start overflow-hidden min-h-screen">
        <Box py={8}>
          <Logo/>
        </Box>
        <main>
          {children}

        </main>
        <LayoutFooter />
        <LayoutDrawer preview={preview}>
          {drawerChildren}
        </LayoutDrawer>
      </div>
    </div>
  )
}