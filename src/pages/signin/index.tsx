import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import firebaseApi from '@/lib/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@/components/common/container'
import Warning from '@/components/common/warning'
import { useRouter } from 'next/router'
import * as gtag from '@/lib/gtag'
import { Button, Center, Checkbox, Stack, useCheckbox } from '@chakra-ui/react';
import { useState } from 'react';
import FaiconDiv from '@/components/common/faicon-div';

export default function LoginPage() {

  const router = useRouter()
  const login = () => {
    gtag.event({
      action: 'login',
      category: 'user',
      label: 'ログインページからのログイン',
    })

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

  const [agreed, setAgreed] = useState(false)

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'} >
      <Container>
        {!user ? (<div className="max-w-xl mb-6">
          <Stack direction="column">
            <Warning />
            <Checkbox onChange={(e)=> setAgreed(agreed ? false : true)} checked>利用規約に同意しました</Checkbox>
            {agreed && <Button colorScheme="twitter" leftIcon={<FaiconDiv icon={['fas','twitter']} />} onClick={login}>
              ログイン
          </Button>}
          </Stack>
        </div>
        ) : (<div>
          <div className="my-16">ログイン中: {user.name}さん (お問い合わせID: {user.uid})</div>
        </div>)}
      </Container>
    </Layout>
  )
}