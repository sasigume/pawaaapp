import Alert from './alert'
import Meta from './meta'
import { ReactNode } from 'react'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
}

export default function Layout({ preview, children }: LayoutProps) {
  return (
    <>
      <Meta />
      <div className="w-screen flex flex-col overflow-hidden min-h-screen">
        <Alert preview={preview} />
        <main>
          {children}
        </main>
      </div>
    </>
  )
}