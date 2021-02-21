import { FC, useContext } from 'react';
import cn from 'classnames'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'
  

const SignIn: FC = () => {
  const googleUser = useAuthentication()

  const login = () => {
    const provider = new firebaseApi.auth.GoogleAuthProvider();
    firebaseApi.auth().signInWithRedirect(provider);
  }
  const logout = () => {
    firebaseApi.auth().signOut();
  }
  return (
    <a className={cn('text-white cursor-pointer text-center block text-md shadow-lg font-bold p-2 rounded-lg',{
      'bg-red-700': googleUser.user,
      'bg-blue-500': !googleUser.user
    })} onClick={googleUser.user ? logout : login}>
      {googleUser.user ? 'ログアウトする' : 'Googleでログイン'}
    </a>
  )
}

export default SignIn