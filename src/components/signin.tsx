import { FC, useContext } from 'react';
import cn from 'classnames'
import firebaseApi from '../lib/firebase';
import { AuthContext } from '../context/auth';

const SignIn: FC = () => {
  const googleUser = useContext(AuthContext).currentUser

  const login = () => {
    const provider = new firebaseApi.auth.GoogleAuthProvider();
    firebaseApi.auth().signInWithRedirect(provider);
  }
  const logout = () => {
    firebaseApi.auth().signOut();
  }
  return (
    <a className={cn('ml-4 text-white cursor-pointer text-center block text-md shadow-lg font-bold p-2 rounded-lg',{
      'bg-red-700': googleUser,
      'bg-blue-500': !googleUser
    })} onClick={googleUser ? logout : login}>
      {googleUser ? 'ログアウトする' : 'Googleでログイン'}
    </a>
  )
}

export default SignIn