import cn from 'classnames'
import UserInfo from './user-info'
import SignIn from './signin'
import Logo from '@/components/common/Logo'

export default function Nav({ preview }: any) {
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
      <div className="flex items-center">
        <UserInfo />
        <SignIn />
      </div>
    </div>
  )
}
