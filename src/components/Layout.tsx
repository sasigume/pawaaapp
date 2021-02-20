import Nav from './nav'
import Meta from './meta'
import { ReactNode } from 'react'
import {CREATOR_ID} from '@/lib/constants'

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
        <div>管理人はメアドを見れます。ご注意ください。
          <br />
          &copy; 2021 Ryo Ando (@{CREATOR_ID}) / Built with <a href="https://www.storyblok.com">Storyblok</a>
        </div>
      </div>
    </div>
  )
}