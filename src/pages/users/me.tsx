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
  Button,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { InputControl, ResetButton, SubmitButton, CheckboxSingleControl } from 'formik-chakra-ui';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import { Formik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import * as gtag from '@/lib/gtag';

// issue #106
/*const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const Warning = dynamic(() => import('@/components/common/warning'));*/
import BreakpointContainer from '@/components/common/breakpoint-container';
import Warning from '@/components/common/warning';

import GetRandomEntity from '@/components/gacha/random-entity';
import { useState } from 'react';

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();
  const useLocal = router.query.useLocal == 'yes' ?? false;
  const [fetching, setFetching] = useState(false);

  const { randomEntity, mutateEntity, error } = GetRandomEntity({
    useLocal: useLocal,
  });
  if (randomEntity[0].name == 'ERROR') {
    mutateEntity({ ...randomEntity });
  }

  const validationSchema = Yup.object({
    displayName: Yup.string().notOneOf(NGwords, '使用できない言葉が含まれています'),
    photoURL: Yup.string(),
    agreed: Yup.boolean().required(),
  });

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
                          photoURL: randomEntity[0].pictureUrl ?? user.photoURL,
                        })
                        .then(() => {
                          router.reload();
                        });
                    }, 1000);
                  }}
                >
                  {({ handleSubmit, values }) => (
                    <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                      <Box fontSize="1.5rem">表示名</Box>
                      <InputControl mb={6} name="displayName" />

                      <Divider my={4} />

                      <Box fontSize="1.5rem">プロフィール画像</Box>
                      <Box h="340px">
                        {/* When too many request sended res become 'ERROR' */}
                        {randomEntity[0].name !== 'ERROR' && (
                          <>
                            {randomEntity[0].pictureUrl ? (
                              <Image
                                width="256px"
                                height="auto"
                                src={randomEntity[0].pictureUrl ?? ''}
                              />
                            ) : (
                              <img
                                src={`/api/ogpgen?text=${randomEntity[0].name}の画像の設定忘れてるよごめんね! この状態で更新しても写真は変わらないよ`}
                              />
                            )}
                          </>
                        )}
                        <Flex alignItems="center" textStyle="h3">
                          {randomEntity[0].iconUrl && (
                            <Box
                              mr={2}
                              w="16px"
                              h="16px"
                              backgroundImage={`url(${randomEntity[0].iconUrl ?? ``})`}
                              backgroundPosition={randomEntity[0].iconBgPos ?? ''}
                            />
                          )}
                          {randomEntity[0].name !== 'ERROR'
                            ? randomEntity[0].name
                            : `しばらくお待ちください`}
                        </Flex>
                      </Box>

                      <ButtonGroup>
                        <Button
                          w="fill"
                          colorScheme="orange"
                          fontSize="1.7rem"
                          py={6}
                          isLoading={randomEntity[0].name == 'ERROR' || fetching}
                          onClick={() => {
                            setFetching(true);
                            mutateEntity().then(() => setFetching(false));
                          }}
                        >
                          エンティティガチャを回す
                        </Button>
                      </ButtonGroup>

                      <Divider my={4} />

                      <CheckboxSingleControl mt={2} name="agreed">
                        利用規約に同意しました
                      </CheckboxSingleControl>
                      {randomEntity[0].name !== 'ERROR' ? (
                        <>
                          <ButtonGroup>
                            {values.agreed && <SubmitButton>プロフィールを更新</SubmitButton>}
                            <ResetButton>リセット</ResetButton>
                          </ButtonGroup>
                        </>
                      ) : (
                        <Box>ガチャ結果を待っているので更新できません。</Box>
                      )}
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
