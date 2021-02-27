import Nav from './nav'
import Meta from './meta'
import { ReactNode } from 'react'
import LayoutFooter from './layout-footer'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  title: string;
  desc: string;
}

export default function Layout({ preview, children, title, desc }: LayoutProps) {
  return (
    <div>
      <Meta title={title} desc={desc} />
      <div className="w-screen flex flex-col items-center justify-start overflow-hidden min-h-screen">
        <Nav preview={preview} />
        <main>
          {children}
        </main>

        <LayoutFooter />

      </div>
    </div>
  )
}