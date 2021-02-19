import Nav from './nav'
import Meta from './meta'
import { ReactNode } from 'react'


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
      <div className="w-screen flex flex-col items-center justify-center overflow-hidden min-h-screen pb-12">
        <Nav preview={preview} />
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}