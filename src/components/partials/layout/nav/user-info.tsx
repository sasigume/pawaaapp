import { FC, useContext } from 'react';
import { AuthContext } from '@/context/auth';

const UserInfo: FC = () => {
  const googleUser = useContext(AuthContext).currentUser
  if(googleUser) {
    return (
     <div>{googleUser.displayName} ({googleUser.email})</div>
    )
  } else {
    return (
      <div>ログインしていません</div>
    )
  }
}

export default UserInfo