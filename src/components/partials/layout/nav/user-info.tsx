import { FC, useContext } from 'react';
import { useAuthentication } from '@/hooks/authentication'

const UserInfo: FC = () => {
  const googleUser = useAuthentication()
  if(googleUser) {
    return (
     <div>ログイン中</div>
    )
  } else {
    return (
      <div>ログインしていません</div>
    )
  }
}

export default UserInfo