import cn from 'classnames'
import UserInfo from './user-info'
import SignIn from './signin'

export default function Nav({ preview }: any) {
  return (
    <div
      className={cn('w-screen z-20 bg-white border-b flex flex-col md:flex-row justify-between items-center align-middle py-2 px-3', {
        'bg-accent-7 border-accent-7': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <div className="py-2 text-center text-sm">
        {preview ? (
          <>
            プレビューモード: 下書きが表示されています
            </>
        ) : (
            <>
              <a className="underline" href="https://twitter.com/sasigume">不具合の報告</a>
            </>
          )}
      </div>
      <div className="flex items-center">
        <UserInfo />
        <SignIn />
      </div>
    </div>
  )
}
