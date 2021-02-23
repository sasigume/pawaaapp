import { useAuthentication } from '@/hooks/authentication'
import Image from 'next/image'

const UserInfo = () => {
  const { user } = useAuthentication()
  return (
    <div className="flex justify-end align-middle items-center bg-gray-200 rounded-xl px-1">
      {user ? (
        <>
          <div className="w-8 h-8 my-1 mr-2 rounded-full overflow-hidden"><Image src={user.photoUrl} width={32} height={32} /></div>
          <div>{user.name}</div>
        </>
      ) : (<>
        <div className="w-8 h-8 my-1 mr-2 rounded-full overflow-hidden"><Image src={process.env.HTTPS_URL + '/favicon.png'} width={32} height={32} /></div>
        <div>ログインしていません</div>
      </>
        )}
    </div>
  )
}

export default UserInfo