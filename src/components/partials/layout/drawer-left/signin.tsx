import { useAuthentication } from '@/hooks/authentication'
import { Box, Button, Stack } from "@chakra-ui/react"
import LinkChakra from '@/components/common/link-chakra'


const SignIn = () => {
  const { user } = useAuthentication()
  return (
    <Stack direction="column" spacing={6}>
      {user && (
        <>
          <Button as={LinkChakra} href="/users/me/" leftIcon={<Box w={6} rounded="full" overflow="hidden"><img src={user.photoURL} width={32} height={32} /></Box>}>
            {user.name}
          </Button>
          {/*
        // since anonymous login is enabled, no need to logout
        <Button aria-label="ログアウトする" onClick={logout} leftIcon={<FaiconDiv icon={['fas', 'user']} />} colorScheme="red" variant="solid">
          ログアウト
      </Button></>
      ) : (<>
        <Button href="/users/me" as={LinkChakra} leftIcon={<Box w={6} rounded="full" overflow="hidden"><Image src={process.env.HTTPS_URL + '/favicon.png'} width={32} height={32} /></Box>}>
          未サインイン
        </Button>
        <Button aria-label="サインインする" onClick={login} leftIcon={<FaiconDiv icon={['fas', 'user']} />} variant="solid">
          サインイン
          </Button>
      </>*/}
        </>
      )}
    </Stack>
  )
}

export default SignIn