
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import firebase from 'firebase/app'
import { toast } from 'react-toastify';
import { useAuthentication } from '@/hooks/authentication'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'
import SectionSeparator from '@/components/common/section-separator'
import Mokuzi from '@/components/common/mokuzi'
import { Box, Button, Checkbox, Container, Stack, Textarea } from '@chakra-ui/react'
import LinkChakra from '@/components/common/link-chakra'
import { BookComment } from '@/models/firebase/BookComment'
import BookCommentComponent from '@/components/partials/book-comment'
import Warning from '@/components/common/warning';

interface BookPageProps {
  firstBook: Book;
  bookComments: BookComment[];
  moreBooks: Book[];
  preview: boolean;
}


export default function BookPage({ firstBook, bookComments, moreBooks, preview }: BookPageProps) {

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
    toast.success('😙 送信できました! 連投はやめてね', {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  const [agreed, setAgreed] = useState(false)

  return (<>
    {(!firstBook) ? (<>

      {router.isFallback ? (
        <Layout preview={preview} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
      ) : (
          (<Layout preview={preview} title={'404 Not found'} desc={''}>
            <ErrorPage title="本が見つかりませんでした" statusCode={404} />
          </Layout>)
        )}
    </>) : (
        <Layout drawerChildren={<Mokuzi chapters={firstBook.chaptersCollection.items} bookSlug={firstBook.slug} />} preview={preview} title={firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
          <div className="mt-6">
            <Container>
              {firstBook && <BookList mode="single" books={[firstBook]} expand={preview ?? false} />}
              <SectionSeparator />

              <Box mb={12}>
                <Box textStyle="h2" mb={6}>
                  <h2>コメント</h2>
                </Box>

                {(bookComments && bookComments.length > 0) ? bookComments.map(
                  (c: BookComment) => <BookCommentComponent c={c} key={c.id} />
                ) : (
                    <div>コメントはありません。</div>
                )}
              </Box>

              
              <Box mb={6}>

                {user ? (<div className="max-w-xl mb-6">
                  <Warning />
                  <form className="w-full px-6" onSubmit={onSubmit}>

                    <div className="flex flex-col jusify-center mb-12">
                      <Textarea
                        my={6}
                        placeholder="コメントを書いてね"
                        onChange={(e) => setBody(e.target.value)}
                        required
                      ></Textarea>
                      {didYouSend ? (
                        <span className="" role="status">
                          (送信できました)
                        </span>
                      ) : (
                      <Stack spacing={2}>
                        <Checkbox onChange={(e) => setAgreed(agreed ? false : true)} checked>利用規約に同意しました</Checkbox>
                        {agreed && (
                          <Button colorScheme="blue" type="submit">
                            コメントする
                          </Button>)}
                      </Stack>
                        )}
                    </div>
                  </form>
                </div>) : (<div className="my-6">
                  <LinkChakra href="/login">ログイン</LinkChakra>してコメントしてみよう!
                </div>)}
              </Box>
              <SectionSeparator />
              {moreBooks && moreBooks.length > 0 && (
                <Box my={10}>
                  <BookList mode="more" books={moreBooks} />
                </Box>)}
            </Container>
          </div>
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

  return {
    props: {
      preview: preview ?? false,
      firstBook: books.book ?? null,
      bookComments: bookComments ?? null,
      moreBooks: books.moreBooks ?? null
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
