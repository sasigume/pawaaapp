import { useAuthentication } from '@/hooks/authentication'
import Image from 'next/image'

const UserInfo = () => {
  const {user} = useAuthentication()
  if(user) {
    return (
     <div className="flex items-center mb-2">
         <div className="w-10 rounded-full overflow-hidden"><Image src={user.photoUrl} width={100} height={100} /></div>
         <div>ログイン中: {user.name}</div>
      </div>
    )
  } else {
    return (
      <div className="text-sm mb-2">ログインしていません</div>
    )
  }
}

export default UserInfo