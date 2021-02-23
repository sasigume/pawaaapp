import cn from 'classnames'
import Link from 'next/link'
import UserInfo from './user-info'
import SignIn from './signin'
import Logo from '@/components/common/Logo'

export default function Nav({ preview }: any) {
  const btnStyle = 'ml-2 shadow-lg rounded-lg block text-white p-2 '
  return (
    <div
      className={cn('w-screen z-20 bg-white border-b flex flex-col md:flex-row justify-between items-center align-middle py-2 px-3', {
        'bg-accent-7 border-accent-7': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <div className="w-64 py-4 md:py-2">
        <Logo />

      </div>
      <div className="">
        <div className="flex justify-end items-center mb-2"><UserInfo /><SignIn /></div>
        <div className="flex justify-end">
          
          <Link href={(`/users/me`)}><a className={btnStyle + 'bg-blue-600'}>マイページ</a></Link>
          <a href="https://blog.pawaa.app" className={btnStyle + 'bg-green-600'}>旧ブログ</a>
        </div>
      </div>
    </div>
  )
}
