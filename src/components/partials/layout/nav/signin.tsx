import cn from 'classnames'
import {useRouter} from 'next/router'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SignIn = () => {
  const { user } = useAuthentication()
  const router = useRouter()
  const login = () => {
   router.push('/signin')
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