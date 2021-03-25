import dynamic from 'next/dynamic';
import Layout from '@/components/partials/layout';
import { useState } from 'react';
import { useAuthentication } from '@/hooks/authentication';
import firebaseApi from '@/lib/firebase';
import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as gtag from '@/lib/gtag';
import { Button, Checkbox, Stack } from '@chakra-ui/react';

const Warning = dynamic(() => import('@/components/common/warning'));
const FaiconDiv = dynamic(() => import('@/components/common/faicon-div'));
const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));

export default function LoginPage() {
  const router = useRouter();

  const login = () => {
    if (typeof window !== 'undefined') {
      gtag.event({
        action: 'login',
        category: 'user',
        label: 'サインインページからのサインイン',
      });
    }

    firebaseApi.auth().languageCode = 'ja';
    firebaseApi
      .auth()
      .signInAnonymously()
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user } = useAuthentication();

  const [agreed, setAgreed] = useState(false);

  return (
    <Layout preview={false} meta={{ title: 'サインイン', desc: 'サインイン' }}>
      <Container>
        <BreakpointContainer>
          {!user ? (
            <Box py={16}>
              <Stack direction="column" mb={8}>
                <Warning />
                <Checkbox onChange={(e) => setAgreed(agreed ? false : true)} checked>
                  利用規約に同意しました
                </Checkbox>
                {agreed && (
                  <Button leftIcon={<FaiconDiv icon={['fas', 'user']} />} onClick={login}>
                    サインイン
                  </Button>
                )}
              </Stack>
            </Box>
          ) : (
            <Box>
              <Box py={16}>
                サインイン中: {user.name}さん (お問い合わせID: {user.uid})
              </Box>
            </Box>
          )}
        </BreakpointContainer>
      </Container>
    </Layout>
  );
}
