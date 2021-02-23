import cn from 'classnames'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <a className={cn('ml-2 text-white cursor-pointer text-center flex items-center p-2 text-md shadow-lg font-bold rounded-lg', {
      'bg-red-700': user,
      'bg-blue-500': !user
    })} onClick={user ? logout : login}>
      {user ? (
        <>ログアウト</>
      ) : (
          <><div className="inline-block w-5"><FontAwesomeIcon icon={['fab','twitter']} /></div> ログイン</>
        )}
    </a>
  )
}

export default SignIn