import { useRouter } from 'next/router'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Stack } from "@chakra-ui/react"
import Image from 'next/image'
import LinkChakra from '@/components/common/link-chakra';
import FaiconDiv from '@/components/common/faicon-div';


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
    <Stack direction="column" spacing={4} mb={4}>
      {user ? (<>
        <Button leftIcon={<div className="w-8 h-8 my-1 mr-2 rounded-full overflow-hidden"><Image src={user.photoUrl} width={32} height={32} /></div>}>
          {user.name}
        </Button>
        <Button onClick={logout} leftIcon={<FaiconDiv icon={['fas','twitter']} />} colorScheme="red" variant="solid">
          ログアウト
        </Button></>
      ) : (<>
        <Button href="/users/me" as={LinkChakra}>
          <div className="w-8 h-8 my-1 mr-2 rounded-full overflow-hidden"><Image src={process.env.HTTPS_URL + '/favicon.png'} width={32} height={32} /></div>
          <div>ログインしていません</div>
        </Button>
        <Button onClick={login} leftIcon={<FaiconDiv icon={['fas','twitter']} />} colorScheme="twitter" variant="solid">
          ログイン
          </Button>
      </>
        )}
    </Stack>
  )
}

export default SignIn