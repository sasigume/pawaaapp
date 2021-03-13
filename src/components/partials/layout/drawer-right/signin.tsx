import { useRouter } from 'next/router'
import firebaseApi from '@/lib/firebase';
import { useAuthentication } from '@/hooks/authentication'
import { Box, Button, Stack } from "@chakra-ui/react"
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
    <Stack direction="column" spacing={6}>
      {/* user ? (<>
        <Button leftIcon={<Box w={6} rounded="full" overflow="hidden"><Image src={user.photoUrl} width={32} height={32} /></Box>}>
          {user.name}
        </Button>
        <Button aria-label="ログアウトする" onClick={logout} leftIcon={<FaiconDiv icon={['fab', 'twitter']} />} colorScheme="red" variant="solid">
          ログアウト
        </Button></>
      ) : (<>
        <Button href="/users/me" as={LinkChakra} leftIcon={<Box w={6} rounded="full" overflow="hidden"><Image src={process.env.HTTPS_URL + '/favicon.png'} width={32} height={32} /></Box>}>
          未サインイン
        </Button>
        <Button aria-label="サインインする" onClick={login} leftIcon={<FaiconDiv icon={['fab', 'twitter']} />} colorScheme="twitter" variant="solid">
          サインイン
          </Button>
      </>
      ) */}
    </Stack>
  )
}

export default SignIn