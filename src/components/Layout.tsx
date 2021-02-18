import Alert from './alert'
import Meta from './meta'
import { ReactNode } from 'react'


interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  desc: string;
}

export default function Layout({ preview, children, desc }: LayoutProps) {
  return (
    <div>
      <Meta desc={desc} />
      <div className="w-screen flex flex-col items-center justify-center overflow-hidden min-h-screen pb-12">
        <Alert preview={preview} />
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}