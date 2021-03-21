import Layout from '@/components/partials/layout'
import { useAuthentication } from '../../hooks/authentication'
import firebaseApi from '@/lib/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container } from '@chakra-ui/react'
import Warning from '@/components/common/warning'
import { useRouter } from 'next/router'
import * as gtag from '@/lib/gtag'
import { Button, Center, Checkbox, Stack, useCheckbox } from '@chakra-ui/react';
import { useState } from 'react';
import FaiconDiv from '@/components/common/faicon-div';
import { BreakpointContainer } from '@/components/common/breakpoint-container';

export default function LoginPage() {

  const router = useRouter()
  const login = () => {
    if (typeof window !== 'undefined') {
      gtag.event({
        action: 'login',
        category: 'user',
        label: 'サインインページからのサインイン',
      })
    }

    firebaseApi.auth().languageCode = 'ja';
    firebaseApi.auth().signInAnonymously()
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
        <BreakpointContainer>
          {!user ? (<Box py={16}>
            <Stack direction="column" mb={8} >
              <Warning />
              <Checkbox onChange={(e) => setAgreed(agreed ? false : true)} checked>利用規約に同意しました</Checkbox>
              {agreed && <Button leftIcon={<FaiconDiv icon={['fas', 'user']} />} onClick={login}>
                サインイン
          </Button>}
            </Stack>
          </Box>
          ) : (<div>
            <div className="my-16">サインイン中: {user.name}さん (お問い合わせID: {user.uid})</div>
          </div>)}
        </BreakpointContainer>
      </Container>
    </Layout>
  )
}