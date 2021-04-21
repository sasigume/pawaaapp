import Layout from '@/components/layout';
import { useState } from 'react';
import { useAuthentication } from '@/hooks/authentication';
import firebaseApi from '@/lib/firebase';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as gtag from '@/lib/gtag';
import { Button, Checkbox, Stack } from '@chakra-ui/react';

import Warning from '@/components/common/warning';
import FaiconDiv from '@/components/common/faicon-div';

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
    <Layout preview={false} meta={{ title: 'サインイン', desc: 'サインイン' }} hideAdsense={true}>
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
    </Layout>
  );
}
