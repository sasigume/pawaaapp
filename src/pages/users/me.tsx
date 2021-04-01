import { useRouter } from 'next/router';
import firebaseApi from '@/lib/firebase';
import Layout from '@/components/partials/layout';
import { useAuthentication } from '../../hooks/authentication';
import { Box, Divider, Heading, ButtonGroup, Stack, SkeletonText, Button } from '@chakra-ui/react';
import { InputControl, ResetButton, SubmitButton, CheckboxSingleControl } from 'formik-chakra-ui';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as gtag from '@/lib/gtag';
import BreakpointContainer from '@/components/common/breakpoint-container';
import Warning from '@/components/common/warning';
import LinkChakra from '@/components/common/link-chakra';

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();

  const validationSchema = Yup.object({
    displayName: Yup.string().notOneOf(NGwords, '使用できない言葉が含まれています'),
    agreed: Yup.boolean().required(),
  });

  return (
    <Layout preview={false} meta={{ title: 'マイページ', desc: 'マイページ' }}>
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
                      })
                      .then(() => {
                        router.reload();
                      });
                  }, 1000);
                }}
              >
                {({ handleSubmit, values }) => (
                  <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                    <Box as="h3" fontSize="1.5rem">
                      表示名: {user.name}
                    </Box>
                    <InputControl area-label="表示名を入力" mb={6} name="displayName" />

                    <Divider my={4} />

                    <Box as="h3" fontSize="1.5rem">
                      プロフィール画像
                    </Box>

                    <Box>プロフィール画像を変えるには、エンティティガチャを引いてください</Box>
                    <Button w="full" as={LinkChakra} colorScheme="orange" href="/entityatsume/">
                      エンティティあつめ
                    </Button>
                    <Divider my={4} />
                    <CheckboxSingleControl mt={2} name="agreed">
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
    </Layout>
  );
}
