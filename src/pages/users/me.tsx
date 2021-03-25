import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import firebaseApi from '@/lib/firebase';
import Layout from '@/components/partials/layout';
import { useAuthentication } from '../../hooks/authentication';
import {
  Box,
  Container,
  Divider,
  Heading,
  ButtonGroup,
  Stack,
  SkeletonText,
  Button,
  Flex,
  Center,
  Badge,
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

import { CheckApi, GetRandomEntity } from '@/lib/nest/entities';
import { Entity } from '@/models/nest/Entity';
import { string } from 'yup/lib/locale';

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();
  const [fetching, setFetching] = useState(false);

  const useStaging = router.query.useStaging == 'yes' ?? false;

  let isApiOk = CheckApi({
    useStaging: useStaging,
  });

  let { randomEntity, mutateEntity, errorEntity } = GetRandomEntity({
    useStaging: useStaging,
  });

  useEffect(() => {
    setFetching(false);
  }, [randomEntity]);

  const validationSchema = Yup.object({
    displayName: Yup.string().notOneOf(NGwords, '使用できない言葉が含まれています'),
    photoURL: Yup.string(),
    agreed: Yup.boolean().required(),
  });

  return (
    <Layout preview={false} meta={{ title: 'マイページ', desc: 'マイページ' }}>
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
                      <Box as="h3" fontSize="1.5rem">
                        表示名: {user.name}
                      </Box>
                      <InputControl area-label="表示名を入力" mb={6} name="displayName" />

                      <Divider my={4} />

                      <Box as="h3" fontSize="1.5rem">
                        プロフィール画像
                      </Box>
                      <Box as="h4" fontSize="1.5rem">
                        現在のプロフィール画像
                      </Box>
                      <Box mb={8}>
                        <Image src={user.photoURL} width="256px" height="256px" />
                      </Box>
                      <Box as="h4" fontSize="1.5rem">
                        新しいプロフィール画像
                      </Box>
                      {isApiOk ? (
                        <>
                          {randomEntity.length > 0 && (
                            <>
                              <Center flexDirection="column" p={6} bg="orange.100" rounded="xl">
                                {randomEntity[0].pictureUrl ? (
                                  <Image
                                    width={128}
                                    height={128}
                                    src={randomEntity[0].pictureUrl ?? ''}
                                  />
                                ) : (
                                  <img
                                    src={`/api/ogpgen?text=${randomEntity[0].name}の画像の設定忘れてるよごめんね! この状態で更新しても写真は変わらないよ`}
                                  />
                                )}
                                <Flex alignItems="center" textStyle="h3">
                                  <Box
                                    mr={2}
                                    w="16px"
                                    h="16px"
                                    backgroundImage={`url(${randomEntity[0].iconUrl ?? ``})`}
                                    backgroundPosition={randomEntity[0].iconBgPos ?? ''}
                                  />
                                  <Box fontSize="1.6rem">
                                    {randomEntity[0].name} (
                                    {randomEntity[0].nameJapanese ?? '日本語名未設定'})
                                  </Box>
                                </Flex>
                                <Box fontSize="1.6rem">
                                  {randomEntity[0].rarelity ?? 'レアリティ未設定'}
                                </Box>
                              </Center>
                            </>
                          )}

                          <Stack>
                            {errorEntity ? (
                              <Badge colorScheme="red">
                                {errorEntity} : リロードしてください。
                              </Badge>
                            ) : (
                              <ButtonGroup>
                                <Button
                                  w="full"
                                  colorScheme="orange"
                                  fontSize="1.7rem"
                                  py={6}
                                  isLoading={fetching}
                                  onClick={() => {
                                    randomEntity = [];
                                    setFetching(true);
                                    mutateEntity();
                                  }}
                                >
                                  エンティティガチャを回す
                                </Button>
                              </ButtonGroup>
                            )}
                            {fetching && <Badge>APIに問い合わせ中...</Badge>}
                          </Stack>
                        </>
                      ) : (
                        <Center>
                          <Box>APIの応答待ち。。。</Box>
                        </Center>
                      )}

                      <Divider my={4} />

                      <CheckboxSingleControl mt={2} name="agreed">
                        利用規約に同意しました
                      </CheckboxSingleControl>
                      {randomEntity ? (
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
                {process.env.NODE_ENV == 'development' && (
                  <Box bg="gray.200" p={4}>
                    DEBUG
                    <br />
                    {JSON.stringify(isApiOk)}
                    <br />
                    {JSON.stringify(fetching)}
                    <br />
                    {JSON.stringify(randomEntity)}
                    <br />
                    {JSON.stringify(errorEntity)}
                  </Box>
                )}
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
