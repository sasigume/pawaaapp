import Nav from './nav'
import Meta from './meta'
import { ReactNode } from 'react'
import { CREATOR_ID } from '@/lib/constants'

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
      <div className="w-screen flex flex-col items-center justify-start overflow-hidden min-h-screen pb-12">
        <Nav preview={preview} />
        <main>          
          {children}
        </main>
        <div className="px-3">
          <div>{preview ? (
            <>
              プレビューモード: 下書きが表示されています
            </>
          ) : (
              <>
                <a className="underline" href={(`https://twitter.com/${CREATOR_ID}`)}>不具合の報告</a>
              </>
            )}</div>
          <div>管理人はメアドを見れます。ご注意ください。</div>
          <div>&copy; 2021 Ryo Ando (@{CREATOR_ID}) / Built with <a href="https://www.storyblok.com">Storyblok</a></div>
        </div>
      </div>
    </div>
  )
}