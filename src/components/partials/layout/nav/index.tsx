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
        <UserInfo />
        <div className="flex justify-between">
          <SignIn />
          <Link href={(`/users/me`)}><a className={btnStyle + 'bg-blue-600'}>マイページ</a></Link>
          <Link href="/comments/received"><a className={btnStyle + 'bg-green-600'}>届いた質問</a></Link>
        </div>
      </div>
    </div>
  )
}
