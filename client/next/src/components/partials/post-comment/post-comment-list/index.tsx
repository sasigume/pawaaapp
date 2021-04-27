import { useState } from 'react';
import firebase from 'firebase/app';
import { PostComment } from '@/models/firebase/PostComment';
import {
  Flex,
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  Stack,
  Center,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import {
  TextareaControl,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
} from 'formik-chakra-ui';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PostCommentSingle from '../post-comment-single';
import Warning from '@/components/common/warning';
import { Post } from '@/models/contentful/Post';
import LinkChakra from '@/components/common/link-chakra';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import { useAuthentication } from '@/hooks/authentication';
import FaiconDiv from '@/components/common/faicon-div';

interface Props {
  postComments: PostComment[];
  post: Post;
}

export default function PostCommentList({ postComments, post }: Props) {
  const { user } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [didYouSend, setSended] = useState(false);

  const validationSchema = Yup.object({
    body: Yup.string()
      .required('入力してください')
      .notOneOf(NGwords, '使用できない言葉が含まれています'),
    agreed: Yup.boolean().required(),
  });
  return (
    <>
      {' '}
      <Button
        w="full"
        mb={8}
        aria-label="戻る"
        as={LinkChakra}
        href={`/${post.slug}/`}
        colorScheme="orange"
        leftIcon={<FaiconDiv icon={['fas', 'book']} />}
      >
        記事に戻る
      </Button>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box minW={{ base: '', md: '15rem' }} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 16 }}>
          {postComments && postComments.length > 0 ? (
            postComments.map((c: PostComment) => <PostCommentSingle c={c} key={c.id} />)
          ) : (
            <div>コメントはありません。</div>
          )}
        </Box>

        <Box mb={6}>
          {user ? (
            <Box>
              <Warning />
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent py={6}>
                  <ModalBody>送信できました！連投はやめてね</ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      閉じる
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {!didYouSend ? (
                <Formik
                  initialValues={{
                    body: '',
                    agreed: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    setTimeout(() => {
                      firebase
                        .firestore()
                        .collection('postComments')
                        .add({
                          senderUid: firebase.auth().currentUser?.uid,
                          senderName: firebase.auth().currentUser?.displayName,
                          photoURL: firebase.auth().currentUser?.photoURL,
                          postSlug: post.slug,
                          body: values.body,
                          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                        })
                        .then(() => {
                          setSended(true);
                        });
                    }, 1000);
                  }}
                >
                  {({ handleSubmit, values }) => (
                    <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                      <TextareaControl name="body" placeholder="コメントを入力" label="コメント" />
                      <CheckboxSingleControl name="agreed">
                        利用規約に同意しました
                      </CheckboxSingleControl>
                      <Button as={LinkChakra} href="/users/me">
                        名前: {user.name}
                      </Button>
                      <ButtonGroup>
                        {values.agreed && (
                          <SubmitButton flexGrow={1}>コメントを投稿する</SubmitButton>
                        )}
                        <ResetButton>リセット</ResetButton>
                      </ButtonGroup>
                    </Stack>
                  )}
                </Formik>
              ) : (
                <>
                  <Center my={16}>送信できました。一覧はしばらく経ってから更新されます。</Center>
                </>
              )}
            </Box>
          ) : (
            <div className="my-6">
              <LinkChakra href="/signin">サインイン</LinkChakra>
              してコメントしてみよう!
            </div>
          )}
        </Box>
      </Flex>
    </>
  );
}
