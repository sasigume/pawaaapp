import Nav from './nav'
import Meta from './meta'
import Link from 'next/link'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { CREATOR_ID } from '@/lib/constants'
import { useAuthentication } from '@/hooks/authentication'

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
  title: string;
  desc: string;
}

export default function Layout({ preview, children, title, desc }: LayoutProps) {
  const { user } = useAuthentication()
  return (
    <div>
      <Meta title={title} desc={desc} />
      <div className="w-screen flex flex-col items-center justify-center overflow-hidden min-h-screen pb-12">
        <Nav preview={preview} />
        <main>
          <Link href={(`users/${user?.uid}`)}>送信ページへ</Link>
          
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
      <ToastContainer />
    </div>
  )
}