import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import firebaseApi from '@/lib/firebase';
import Layout from '@/components/partials/layout';
import { useAuthentication } from '../../hooks/authentication';
import {
  Box,
  Radio,
  Container,
  Divider,
  Heading,
  ButtonGroup,
  Stack,
  SkeletonText,
} from '@chakra-ui/react';
import {
  InputControl,
  RadioGroupControl,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
} from 'formik-chakra-ui';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import { Formik } from 'formik';
import { SITE_FULL_URL } from '@/lib/constants';
import * as Yup from 'yup';
import * as gtag from '@/lib/gtag';

const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const Warning = dynamic(() => import('@/components/common/warning'));

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();

  const actualPhotoUrl = (n: number) => `${SITE_FULL_URL}/photoURL/${n}.png`;
  const validationSchema = Yup.object({
    displayName: Yup.string().notOneOf(NGwords, '使用できない言葉が含まれています'),
    photoURL: Yup.string(),
    agreed: Yup.boolean().required(),
  });

  let loadedUser = false;

  if (user) {
    loadedUser = true;
  }

  return (
    <Layout preview={false} title={'マイページ'} desc={'マイページ'}>
      <Container>
        <BreakpointContainer>
          {user ? (
            <>
              <Box>
                <Heading as="h1" mb={6} fontStyle="h1">
                  マイページ
                </Heading>
                <Box bg="gray.100" rounded="lg" p={6} m={3}>
                  <Box>{user.name}さん</Box>
                  <Box>(お問い合わせID: {user.uid})</Box>
                </Box>
              </Box>
              <Divider my={8} />
              <Heading as="h2" fontStyle="h2" mb={4}>
                プロフィール設定
              </Heading>
              <Box mb={8}>
                <Warning />
                <Formik
                  initialValues={{
                    displayName: '',
                    photoURL: '1',
                    agreed: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    if (typeof window !== 'undefined') {
                      gtag.event({
                        action: 'updateProfile',
                        category: 'user',
                        label: 'プロフィールのアップデート',
                      });
                    }
                    setTimeout(() => {
                      firebaseApi
                        .auth()
                        .currentUser?.updateProfile({
                          displayName: values.displayName ?? user.name,
                          photoURL: actualPhotoUrl(parseInt(values.photoURL ?? user.photoURL)),
                        })
                        .then(() => {
                          router.reload();
                        });
                    }, 1000);
                  }}
                >
                  {({ handleSubmit, values }) => (
                    <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                      <InputControl name="displayName" label="表示名" />
                      <RadioGroupControl name="photoURL" label="プロフィール画像">
                        <Box>
                          <Radio value="1"></Radio>
                          <img width={64} src={actualPhotoUrl(1)} />
                        </Box>
                        <Box>
                          <Radio value="2"></Radio>
                          <img width={64} src={actualPhotoUrl(2)} />
                        </Box>
                        <Box>
                          <Radio value="3"></Radio>
                          <img width={64} src={actualPhotoUrl(3)} />
                        </Box>
                      </RadioGroupControl>
                      <CheckboxSingleControl name="agreed">
                        利用規約に同意しました
                      </CheckboxSingleControl>
                      <ButtonGroup>
                        {values.agreed && <SubmitButton>プロフィールを更新</SubmitButton>}
                        <ResetButton>リセット</ResetButton>
                      </ButtonGroup>
                    </Stack>
                  )}
                </Formik>
              </Box>
            </>
          ) : (
            <>
              <SkeletonText my={8} spacing={4} noOfLines={16} />
            </>
          )}
        </BreakpointContainer>
      </Container>
    </Layout>
  );
}
