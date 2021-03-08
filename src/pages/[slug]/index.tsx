
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '@/hooks/authentication'

import ErrorPage from 'next/error'

import { getPostAndMorePosts, getAllPostsWithSlug } from '@/lib/contentful/graphql'
import { Post } from '@/models/contentful/Post'

import Loading from '@/components/common/loading'
import Layout from '@/components/partials/layout'
import PostList from '@/components/partials/post'
import {
  Box, Button, Checkbox, Container, Stack, Textarea, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Center,
  Divider,
  Flex,
  Skeleton
} from '@chakra-ui/react'
import LinkChakra from '@/components/common/link-chakra'
import { PostComment } from '@/models/firebase/PostComment'
import PostCommentComponent from '@/components/partials/post-comment'
import Warning from '@/components/common/warning';
import { SITE_URL } from '@/lib/constants'

interface PostPageProps {
  firstPost: Post;
  postComments: PostComment[];
  morePosts: Post[];
  preview: boolean;
  tweetCount: number;
}


export default function PostPage({ firstPost, postComments, morePosts, preview, tweetCount }: PostPageProps) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = useAuthentication()

  const [body, setBody] = useState('')
  const [didYouSend, setSended] = useState(false)

  const router = useRouter()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // prevent duplicated post
    setSended(true)

    await firebase.firestore().collection('postComments').add({
      senderUid: firebase.auth().currentUser?.uid,
      senderName: firebase.auth().currentUser?.providerData[0]?.displayName,
      postSlug: firstPost.slug,
      body,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
    })

    setBody('')
    console.log('送信できました')

  }

  const [agreed, setAgreed] = useState(false)
  
  return (<>
    {(!firstPost) ? (<>

      {router.isFallback ? (
        <Loading />
      ) : (
        (<Layout preview={preview} title={'404 Not found'} desc={''}>
          <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
        </Layout>)
      )}
    </>) : (
      <Layout tweetCount={tweetCount} preview={preview} title={firstPost.title} desc={firstPost.description ? firstPost.description : ''}>
        <Box mt={12}>
          <Container maxW="container.lg">
            {firstPost && <PostList mode="single" posts={[firstPost]} expand={preview ?? false} />}
            <Divider my={8} borderColor="gray.400" />

            <Box textStyle="h2" mb={6}>
              <h2>コメント</h2>
            </Box>

            <Flex direction={{ base: "column", md: "row" }}>

              <Box minW={{ base: "", md: "sm" }} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 16 }}>


                {(postComments && postComments.length > 0) ? postComments.map(
                  (c: PostComment) => <PostCommentComponent c={c} key={c.id} />
                ) : (
                  <div>コメントはありません。</div>
                )}
              </Box>


              <Box mb={6}>

                {user ? (<Box>
                  <Warning />
                  <form className="w-full px-6" onSubmit={onSubmit}>

                    <div className="flex flex-col jusify-center mb-12">
                      <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent py={6}>
                          <ModalBody>
                            送信できました！連投はやめてね
                          </ModalBody>
                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>閉じる</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      {didYouSend ? (
                        <Center role="status">
                          (送信できました)
                        </Center>
                      ) : (
                        <Stack spacing={2}>
                          <Textarea
                            my={6}
                            placeholder="コメントを書いてね"
                            onChange={(e) => setBody(e.target.value)}
                            required
                          ></Textarea>
                          <Checkbox onChange={(e) => setAgreed(agreed ? false : true)} checked>利用規約に同意しました</Checkbox>
                          {agreed && (
                            <Button onClick={onOpen} colorScheme="blue" type="submit">
                              コメントする
                            </Button>)}
                        </Stack>
                      )}
                    </div>
                  </form>
                </Box>) : (<div className="my-6">
                  <LinkChakra href="/login">ログイン</LinkChakra>してコメントしてみよう!
                </div>)}
              </Box>
            </Flex>
            <Divider my={8} borderColor="gray.400" />
            {morePosts && morePosts.length > 0 && (
              <Box my={10}>
                <PostList mode="more" posts={morePosts} />
              </Box>)}
          </Container>
        </Box>
      </Layout>
    )
    }
  </>
  )
}

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview }: GSProps) {

  const posts = await getPostAndMorePosts(params.slug, preview)
  const commentsRes = await fetch(process.env.HTTPS_URL + `/api/postComments/${params.slug}`)
  const postComments = await commentsRes.json()

  const searchWord = SITE_URL + '/' + params.slug

  const tweets = await fetch(process.env.HTTPS_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  return {
    props: {
      preview: preview ?? false,
      firstPost: posts.post ?? null,
      postComments: postComments ?? null,
      morePosts: posts.morePosts ?? null,
      tweetCount: tweetCount ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug(false)
  let paths = allPosts?.map((post: Post) => `/${post.slug}`) ?? []

  return {
    paths: paths,
    fallback: true
  }
}
