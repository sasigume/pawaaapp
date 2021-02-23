import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import firebaseApi from '@/lib/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@/components/common/container'
import Warning from '@/components/common/warning'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const login = () => {
    const provider = new firebaseApi.auth.TwitterAuthProvider();
    firebaseApi.auth().languageCode = 'ja';
    firebaseApi.auth().signInWithPopup(provider)
      .then(() => {
        router.back()
      })
      .catch((error) => {
        console.log(error)
      });

  }

  const { user } = useAuthentication()

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        {!user ? (<div className="max-w-xl mb-6">
          <Warning />
          <a className="w-40 mx-auto justify-around text-white cursor-pointer text-center flex items-center p-4 text-xl text-md shadow-lg font-bold rounded-lg bg-blue-500" onClick={login}>
            <div className="inline-block w-5"><FontAwesomeIcon icon={['fab', 'twitter']} /></div> ログイン
          </a></div>
        ) : (<div>
          <div className="my-16">ログイン中: {user.name}さん (お問い合わせID: {user.uid})</div>
        </div>)}
      </Container>
    </Layout>
  )
}