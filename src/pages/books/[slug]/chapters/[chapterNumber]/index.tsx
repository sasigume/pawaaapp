
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'
import MarkdownRender from '@/components/common/MarkdownRender'
import LinkChakra from '@/components/common/link-chakra'
import Mokuzi from '@/components/common/mokuzi'
import { Box, Button, Center, Container, Stack, Flex } from '@chakra-ui/react'
import SectionSeparator from '@/components/common/section-separator'


interface BookChapterPageProps {
  firstBook: Book;
  moreBooks: Book[];
  chapterNumber: string;
  preview: boolean;
}


export default function BookChapterPage({ firstBook, moreBooks, chapterNumber, preview }: BookChapterPageProps) {

  const router = useRouter()

  // if chapter includes alphabet return NaN to prevent parsing number from mixed string
  // otherwise string like '1aaa' is somehow considered as chapter number
  const includeAlphabet = new RegExp(`[A-Za-z]`)
  let intChapterNumber: number
  includeAlphabet.test(chapterNumber) ? intChapterNumber = NaN : intChapterNumber = parseInt(chapterNumber)

  const PageButtons = () => (
    <Center my={8}>
      <Stack direction="row" spacing={4}>
        {intChapterNumber != 1 && (
          <Button colorScheme="red" as={LinkChakra} href={(`/books/${firstBook.slug}/chapters/${intChapterNumber - 1}`)}>
            &lt; 前ページ
          </Button>)}
        <Button colorScheme="gray" as={LinkChakra} href={(`/books/${firstBook.slug}`)}>
          目次へ
      </Button>
        {(intChapterNumber) < firstBook.chaptersCollection.items.length && (
          <Button colorScheme="green" as={LinkChakra} href={(`/books/${firstBook.slug}/chapters/${intChapterNumber + 1}`)}>
            次ページ &gt;
          </Button>)}
      </Stack>
    </Center>
  )

  let target
  (firstBook && intChapterNumber != NaN) ? target = firstBook.chaptersCollection.items[intChapterNumber - 1] : target = null

  return (
    <>
      {firstBook ? (<>

        {!target ? (
          <>
            {router.isFallback ? (
              <Layout preview={preview} title={'Loading...'} desc={''}>
                <div>読み込み中です。</div>
              </Layout>
            ) : (
                <Layout preview={preview} title={'404 Chapter Not found'} desc={''}>
                  <div className="mt-6">
                    <Container>
                      <div className="my-20 text-center">
                        <ErrorPage title="本はありますがチャプターが見つかりません" statusCode={404} />
                      </div>
                    </Container>
                  </div>
                </Layout>
              )}
          </>
        ) : (
            <Layout drawerChildren={firstBook.chaptersCollection.items ? <Mokuzi chapters={firstBook.chaptersCollection.items} bookSlug={firstBook.slug} /> : <></>} preview={preview} title={target.title + ' | ' + firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
              <div className="mt-6">
                <Container>
                  {target && (

                    <div
                      className="overflow-x-hiddenmb-12">
                      <LinkChakra href={(`/books/${firstBook.slug}`)}>
                        <Box textStyle="h1" mb={10}>
                          <h1>{firstBook.title}</h1>
                        </Box>
                      </LinkChakra>
                      <PageButtons />
                      <Flex direction="column" style={{ maxWidth: '650px' }}>
                        <Box textStyle="h2"><h2>{target.title}</h2></Box>
                        <MarkdownRender source={target.md} />
                      </Flex>
                      <PageButtons />
                    </div>

                  )}
                  <SectionSeparator />
                  {<Box>{moreBooks && moreBooks.length > 0 && <BookList mode="more" books={moreBooks} />}</Box>}
                </Container>
              </div>
            </Layout>
          )}
      </>
      ) : (
          <>

            {router.isFallback ? (
              <Layout preview={preview} title={'Loading...'} desc={''}>
                <div>読み込み中です。</div>
              </Layout>
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
  return {
    props: {
      preview: preview ?? false,
      firstBook: books.book ?? null,
      chapterNumber: params.chapterNumber.toString() ?? NaN,
      moreBooks: books.moreBooks ?? [],
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