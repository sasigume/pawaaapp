import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import Image from 'next/image';
import * as Yup from 'yup';

// issue #106
/*const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const Warning = dynamic(() => import('@/components/common/warning'));*/
import BreakpointContainer from '@/components/common/breakpoint-container';
import Warning from '@/components/common/warning';

import { CheckApi, GetRandomEntity } from '@/lib/nest/entities';
import LinkChakra from '@/components/common/link-chakra';

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <Layout preview={false} meta={{ title: 'エンティティあつめ', desc: 'マイページ' }}>
      <Container>
        <BreakpointContainer>
          {user ? (
            <>
              <Box mb={8}>
                <Stack spacing={6}>
                  {isApiOk ? (
                    <>
                      {randomEntity.length > 0 && (
                        <>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent minW="80vw">
                              <ModalHeader>ガチャ結果</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Center flexDirection="column" p={6} bg="orange.100" rounded="xl">
                                  {randomEntity[0].pictureUrl ? (
                                    <Image
                                      width={128}
                                      height={128}
                                      src={randomEntity[0].pictureUrl ?? ''}
                                    />
                                  ) : (
                                    <img
                                      src={`/api/ogpgen?text=${randomEntity[0].name}の画像の設定忘れてるよごめんね!`}
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
                              </ModalBody>

                              <ModalFooter>
                                <Button colorScheme="blue" onClick={onClose}>
                                  閉じる
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          {randomEntity[0].pictureUrl ? (
                            <Image
                              width={128}
                              height={128}
                              src={randomEntity[0].pictureUrl ?? ''}
                            />
                          ) : (
                            <img
                              src={`/api/ogpgen?text=${randomEntity[0].name}の画像の設定忘れてるよごめんね!`}
                            />
                          )}
                        </>
                      )}

                      <Center flexDirection="column">
                        {errorEntity ? (
                          <Badge colorScheme="red">{errorEntity} : リロードしてください。</Badge>
                        ) : (
                          <ButtonGroup>
                            <Stack>
                              <Button
                                w="full"
                                colorScheme="orange"
                                fontSize="1.4rem"
                                py={6}
                                isLoading={fetching}
                                onClick={() => {
                                  randomEntity = [];
                                  setFetching(true);
                                  mutateEntity().then((res: any) => {
                                    if (res && res?.length > 0) {
                                      onOpen();
                                    }
                                  });
                                }}
                              >
                                エンティティガチャを回す
                              </Button>
                              <Button colorScheme="blue" as={LinkChakra} href="/entityatsume/zukan">
                                排出エンティティ一蘭
                              </Button>
                            </Stack>
                          </ButtonGroup>
                        )}
                        {fetching && <Badge>APIに問い合わせ中...</Badge>}
                      </Center>
                    </>
                  ) : (
                    <Center>
                      <Box>APIの応答待ち。。。</Box>
                    </Center>
                  )}
                </Stack>
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
            <>ログインしてガチャを引こう！</>
          )}
        </BreakpointContainer>
      </Container>
    </Layout>
  );
}
