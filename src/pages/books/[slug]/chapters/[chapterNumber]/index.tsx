
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book'
import { Box, Container, Divider } from '@chakra-ui/react'
import SingleChapter from '@/components/partials/book/single-chapter'
import { SITE_URL } from '@/lib/constants'
import Mokuzi from '@/components/common/mokuzi'

interface BookChapterPageProps {
  firstBook: Book;
  moreBooks: Book[];
  chapterNumber: string;
  preview: boolean;
  tweetCount: number;
}


export default function BookChapterPage({ firstBook, moreBooks, chapterNumber, preview, tweetCount }: BookChapterPageProps) {

  const router = useRouter()

  // if chapter includes alphabet return NaN to prevent parsing number from mixed string
  // otherwise string like '1aaa' is somehow considered as chapter number
  const includeAlphabet = new RegExp(`[A-Za-z]`)
  let intChapterNumber: number
  includeAlphabet.test(chapterNumber) ? intChapterNumber = NaN : intChapterNumber = parseInt(chapterNumber)

  let target
  (firstBook && intChapterNumber != NaN) ? target = firstBook.chaptersCollection.items[intChapterNumber - 1] : target = null

  return (
    <>
      {firstBook ? (<>

        {!target ? (
          <>
            {router.isFallback ? (
              <></>
            ) : (
                <Layout preview={preview} title={'404 Chapter Not found'} desc={''}>
                  <ErrorPage title="本はありますがチャプターが見つかりません" statusCode={404} />
                </Layout>
              )}
          </>
        ) : (
            <Layout drawerLeftChildren={firstBook && <Mokuzi chapters={firstBook.chaptersCollection.items} bookSlug={firstBook.slug} />} tweetCount={tweetCount} preview={preview} title={target.title + ' | ' + firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
              <Box w="full" mt={12} mb={10}>
                <Container maxW="container.lg" px={0}>
                  {target && (
                    <SingleChapter chapter={target} chapterNumber={intChapterNumber} book={firstBook} />
                  )}
                  <Divider my={8} borderColor="gray.400" />
                  {<Box px={6}>
                    {moreBooks && moreBooks.length > 0 && <BookList mode="more" books={moreBooks} />}</Box>}
                </Container>
              </Box>
            </Layout>
          )}
      </>
      ) : (
          <>

            {router.isFallback ? (
              <></>
            ) : (
                <Layout preview={preview} title={'404 Book Not found'} desc={''}>
                  <ErrorPage title="本が見つかりませんでした" statusCode={404} />
                </Layout>
              )}
          </>
        )}
    </>
  )
}


interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview }: GSProps) {

  const books = await getBookAndMoreBooks(params.slug, preview)
  const searchWord = SITE_URL + '/books/' + params.slug

  const tweets = await fetch(process.env.HTTPS_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  return {
    props: {
      preview: preview ?? false,
      firstBook: books.book ?? null,
      chapterNumber: params.chapterNumber.toString() ?? NaN,
      moreBooks: books.moreBooks ?? [],
      tweetCount: tweetCount ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allBooks = await getAllBooksWithSlug(false)

  return {
    paths: allBooks?.map((book: Book) => {
      return book.chaptersCollection.items.map(
        // Making URLs easy to understand by adding one
        (chapter: any, num: number) => {
          return {
            params: {
              slug: book.slug,
              chapterNumber: num.toString()
              // Dynamic route only accepts string
            }
          }
        }
      )
    })[0] || [],
    fallback: true,
  }
}