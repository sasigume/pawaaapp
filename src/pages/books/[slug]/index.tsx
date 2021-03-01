
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '@/hooks/authentication'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book'
import {
  Box, Button, Checkbox, Container, Stack, Textarea, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Center,
  Divider,
  Flex
} from '@chakra-ui/react'
import LinkChakra from '@/components/common/link-chakra'
import { BookComment } from '@/models/firebase/BookComment'
import BookCommentComponent from '@/components/partials/book-comment'
import Warning from '@/components/common/warning';
import { SITE_URL } from '@/lib/constants'

interface BookPageProps {
  firstBook: Book;
  bookComments: BookComment[];
  moreBooks: Book[];
  preview: boolean;
  tweetCount: number;
}


export default function BookPage({ firstBook, bookComments, moreBooks, preview, tweetCount }: BookPageProps) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user } = useAuthentication()

  const [body, setBody] = useState('')
  const [didYouSend, setSended] = useState(false)

  const router = useRouter()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // prevent duplicated post
    setSended(true)

    await firebase.firestore().collection('bookComments').add({
      senderUid: firebase.auth().currentUser?.uid,
      senderName: firebase.auth().currentUser?.providerData[0]?.displayName,
      bookSlug: firstBook.slug,
      body,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
    })

    setBody('')
    console.log('送信できました')

  }

  const [agreed, setAgreed] = useState(false)

  return (<>
    {(!firstBook) ? (<>

      {router.isFallback ? (
        <></>
      ) : (
          (<Layout preview={preview} title={'404 Not found'} desc={''}>
            <ErrorPage title="本が見つかりませんでした" statusCode={404} />
          </Layout>)
        )}
    </>) : (
        <Layout tweetCount={tweetCount} preview={preview} title={firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
          <Box mt={12}>
            <Container maxW="container.lg">
              {firstBook && <BookList mode="single" books={[firstBook]} expand={preview ?? false} />}
              <Divider my={8} borderColor="gray.400" />

              <Box textStyle="h2" mb={6}>
                <h2>コメント</h2>
              </Box>

              <Flex direction={{ base: "column", md: "row" }}>

                <Box minW={{ base: "", md: "sm" }} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 16 }}>


                  {(bookComments && bookComments.length > 0) ? bookComments.map(
                    (c: BookComment) => <BookCommentComponent c={c} key={c.id} />
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
              {moreBooks && moreBooks.length > 0 && (
                <Box my={10}>
                  <BookList mode="more" books={moreBooks} />
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

  const books = await getBookAndMoreBooks(params.slug, preview)

  const commentsRes = await fetch(process.env.HTTPS_URL + `/api/bookComments/${params.slug}`)
  const bookComments = await commentsRes.json()

  const searchWord = SITE_URL + '/books/' + params.slug

  const tweets = await fetch(process.env.HTTPS_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  return {
    props: {
      preview: preview ?? false,
      firstBook: books.book ?? null,
      bookComments: bookComments ?? null,
      moreBooks: books.moreBooks ?? null,
      tweetCount: tweetCount ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allBooks = await getAllBooksWithSlug(false)
  return {
    paths: allBooks?.map((book: Book) => `/books/${book.slug}`) || [],
    fallback: true,
  }
}
