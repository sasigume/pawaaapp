import { useAuthentication } from '@/hooks/authentication'

const UserInfo = () => {
  const {user} = useAuthentication()
  if(user) {
    return (
     <div>{user.name}</div>
    )
  } else {
    return (
      <div>ログインしていません</div>
    )
  }
}

export default UserInfo