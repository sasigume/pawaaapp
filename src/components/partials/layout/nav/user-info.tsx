import { useAuthentication } from '@/hooks/authentication'

const UserInfo = () => {
  const {user} = useAuthentication()
  if(user) {
    return (
     <div className="text-sm mb-2">
       <div>ログイン中: {user.name} / {user.email}</div>
      </div>
    )
  } else {
    return (
      <div className="text-sm mb-2">ログインしていません</div>
    )
  }
}

export default UserInfo