import dynamic from 'next/dynamic';
import { useState } from 'react';
import firebase from 'firebase/app';
import { useAuthentication } from '@/hooks/authentication';

import ErrorPage from 'next/error';

import {
  getAllPlatformsWithSlug,
  getPostAndMorePosts,
  getAllPostsWithSlug,
} from '@/lib/contentful/graphql';
import { Post } from '@/models/contentful/Post';

import Layout from '@/components/partials/layout';
import {
  Box,
  Button,
  Container,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Divider,
  Flex,
  ButtonGroup,
  Center,
} from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import { PostComment } from '@/models/firebase/PostComment';
import { SITE_URL } from '@/lib/constants';

import { Platform } from '@/models/contentful/Platform';
import Head from 'next/head';
import * as Yup from 'yup';

const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const PostCommentComponent = dynamic(() => import('@/components/partials/post-comment'));
const Warning = dynamic(() => import('@/components/common/warning'));
const MarkdownToc = dynamic(() => import('@/components/common/markdown-toc'));
const PostList = dynamic(() => import('@/components/partials/post'));

import {
  TextareaControl,
  ResetButton,
  SubmitButton,
  CheckboxSingleControl,
} from 'formik-chakra-ui';
import { NGwords } from 'pages/api/ogpgen/NGwords';
import { Formik } from 'formik';
import HeroWithImage from '@/components/common/hero-with-image';

interface PostPageProps {
  firstPost: Post;
  postComments: PostComment[];
  morePosts: Post[];
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  allPlatforms: Platform[];
  hideAdsense: boolean;
}

export default function PostPage({
  firstPost,
  postComments,
  morePosts,
  preview,
  tweetCount,
  revalEnv,
  allPlatforms,
  hideAdsense,
}: PostPageProps) {
  const { user } = useAuthentication();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [didYouSend, setSended] = useState(false);

  const validationSchema = Yup.object({
    body: Yup.string()
      .required('入力してください')
      .notOneOf(NGwords, '使用できない言葉が含まれています'),
    agreed: Yup.boolean().required(),
  });

  const tocProps = (post: Post) => {
    return {
      tweetCount: tweetCount ?? 0,
      tweetText: post.title,
      commentCount: postComments.length ?? 0,
      markdown: post.body,
    };
  };

  return (
    <>
      {!firstPost ? (
        <>
          <Layout preview={preview} title={'404 Not found'} desc={''}>
            <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
          </Layout>
        </>
      ) : (
        <Layout
          heroImageUrl={firstPost.heroImage && firstPost.heroImage.url}
          leftFixedChildren={firstPost && postComments && <MarkdownToc {...tocProps(firstPost)} />}
          drawerLeftChildren={
            firstPost && postComments && <MarkdownToc {...tocProps(firstPost)} headingDepth={6} />
          }
          revalEnv={revalEnv}
          tweetCount={tweetCount}
          preview={preview}
          title={firstPost.title}
          desc={firstPost.description ? firstPost.description : ''}
        >
          <Head>
            <link
              rel="canonical"
              href={`${process.env.HTTPS_URL ?? ''}/${firstPost.slug ?? ''}/`}
            />
          </Head>
          {firstPost.heroImage && <HeroWithImage src={firstPost.heroImage?.url} />}
          <Box>
            <Container px={0} maxW="container.lg">
              <BreakpointContainer breakpointName="md" actualWidth="650px">
                {preview && <Box>デバッグ: プレビューON</Box>}

                {firstPost && (
                  <PostList mode="single" posts={[firstPost]} expand={preview ?? false} />
                )}

                <Divider my={8} borderColor="gray.400" />
                {morePosts && morePosts.length > 0 && (
                  <Box my={10}>
                    <PostList mode="more" posts={morePosts} />
                  </Box>
                )}

                <Divider my={8} borderColor="gray.400" />

                <Box id="a_comment" textStyle="h2" mb={6}>
                  <h2>コメント</h2>
                </Box>

                <Flex direction={{ base: 'column', md: 'row' }}>
                  <Box
                    minW={{ base: '', md: '15rem' }}
                    mb={{ base: 8, md: 0 }}
                    mr={{ base: 0, md: 16 }}
                  >
                    {postComments && postComments.length > 0 ? (
                      postComments.map((c: PostComment) => (
                        <PostCommentComponent c={c} key={c.id} />
                      ))
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
                                    postSlug: firstPost.slug,
                                    body: values.body,
                                    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                                  })
                                  .then(() => {
                                    setSended(true);
                                  });
                                console.log(
                                  `Comment posted: please wait until revalidation(${revalEnv} sec.)`,
                                );
                              }, 1000);
                            }}
                          >
                            {({ handleSubmit, values }) => (
                              <Stack as="form" onSubmit={handleSubmit as any} spacing={6}>
                                <TextareaControl
                                  name="body"
                                  placeholder="コメントを入力"
                                  label="コメント"
                                />
                                <CheckboxSingleControl name="agreed">
                                  利用規約に同意しました
                                </CheckboxSingleControl>
                                <ButtonGroup>
                                  {values.agreed && <SubmitButton>コメントを投稿する</SubmitButton>}
                                  <ResetButton>リセット</ResetButton>
                                </ButtonGroup>
                              </Stack>
                            )}
                          </Formik>
                        ) : (
                          <>
                            <Center my={16}>
                              送信できました。一覧は{revalEnv / 60}
                              分後に更新されます。
                            </Center>
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
              </BreakpointContainer>
            </Container>
          </Box>
        </Layout>
      )}
    </>
  );
}

interface GSProps {
  params: any;
  preview: boolean;
}

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');

export async function getStaticProps({ params, preview }: GSProps) {
  const allPlatforms = await getAllPlatformsWithSlug(preview, 10);

  const posts = await getPostAndMorePosts(params.slug, preview);

  const commentsRes = await fetch(process.env.API_URL + `/api/postComments/${params.slug}`);
  const postComments = await commentsRes.json();

  const searchWord = SITE_URL + '/' + params.slug;

  const tweets = await fetch(
    process.env.API_URL +
      '/api/twitter?word=' +
      encodeURIComponent(searchWord) +
      '&secret=' +
      process.env.TWITTER_SECRET,
  );
  const tweetsJson = await tweets.json();
  let tweetCount;
  tweetsJson.data ? (tweetCount = tweetsJson.meta.result_count) : (tweetCount = null);

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800');
  return {
    props: {
      preview: preview ?? false,
      firstPost: posts.post ?? null,
      postComments: postComments ?? null,
      morePosts: posts.morePosts ?? null,
      tweetCount: tweetCount ?? null,
      revalEnv: revalEnv,
      allPlatforms: allPlatforms ?? null,
      hideAdsense: posts.post.hideAdsense ?? false,
    },
    revalidate: revalEnv,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug(false, TOTAL_LIMIT);
  let paths = allPosts?.map((post: Post) => `/${post.slug}/`) ?? [];

  return {
    paths: paths,
    fallback: false,
  };
}
