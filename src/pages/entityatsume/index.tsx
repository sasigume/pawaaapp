import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebaseApi from '@/lib/firebase';
import Layout from '@/components/layout';
import { useAuthentication } from '../../hooks/authentication';
import * as gtag from '@/lib/gtag';
import {
  Box,
  ButtonGroup,
  Stack,
  Button,
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
  SkeletonText,
} from '@chakra-ui/react';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import Image from 'next/image';
import * as Yup from 'yup';

import { CheckApi, GetRandomEntity } from '@/lib/nest/entities';
import LinkChakra from '@/components/common/link-chakra';
import { SingleEntityComponent } from '@/components/partials/entity/single-entity';

export default function UsersMe() {
  const { user } = useAuthentication();
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
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

  return (
    <Layout
      preview={false}
      meta={{ title: 'エンティティあつめ', desc: 'マイページ' }}
      hideAdsense={true}
    >
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
                            <SingleEntityComponent entity={randomEntity[0]} />
                            {randomEntity[0].pictureUrl && (
                              <Button
                                isLoading={updatingProfile}
                                onClick={() => {
                                  setTimeout(() => {
                                    setUpdatingProfile(true);
                                    firebaseApi
                                      .auth()
                                      .currentUser?.updateProfile({
                                        photoURL: randomEntity[0].pictureUrl,
                                      })
                                      .then(() => {
                                        setUpdatingProfile(false);
                                        router.reload();
                                      });
                                  }, 1000);
                                }}
                              >
                                プロフィール画像に設定
                              </Button>
                            )}
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" onClick={onClose}>
                              閉じる
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      {randomEntity[0].pictureUrl ? (
                        <Image width={128} height={128} src={randomEntity[0].pictureUrl ?? ''} />
                      ) : (
                        <img
                          src={`/api/ogpgen/?text=${randomEntity[0].name}の画像の設定忘れてるよごめんね!`}
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
                              if (typeof window !== 'undefined') {
                                gtag.event({
                                  action: 'play',
                                  category: 'entitygacha',
                                  label: 'トップページのガチャ',
                                });
                              }
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
        <>
          <SkeletonText my={8} spacing={4} noOfLines={16} />
        </>
      )}
    </Layout>
  );
}
