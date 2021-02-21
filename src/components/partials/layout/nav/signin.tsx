import cn from 'classnames'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'


const SignIn = () => {
  const { user } = useAuthentication()
  const login = () => {
    const provider = new firebaseApi.auth.TwitterAuthProvider();
    firebaseApi.auth().languageCode = 'ja';
    firebaseApi.auth().signInWithPopup(provider)
      .catch((error) => {
        console.log(error)
      });
  }
  const logout = () => {
    firebaseApi.auth().signOut();
  }
  return (
    <a className={cn('text-white cursor-pointer text-center block text-md shadow-lg font-bold p-2 rounded-lg', {
      'bg-red-700': user,
      'bg-blue-500': !user
    })} onClick={user ? logout : login}>
      {user ? 'ログアウトする' : 'Twitterでログイン'}
    </a>
  )
}

export default SignIn