
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'
import SectionSeparator from '@/components/common/section-separator'
import { BookChapter } from '@/models/contentful/BookChapter'
import BookChapterList from '@/components/partials/book-list/book/chapter-list'
import MarkdownRender from '@/components/common/MarkdownRender'


interface BookChapterPageProps {
  firstBook: Book;
  moreBooks: Book[];
  chapterNumber: number;
  preview: boolean;
}


export default function BookChapterPage({ firstBook, moreBooks, chapterNumber, preview }: BookChapterPageProps) {

  const router = useRouter()

  return (
    <>
      {firstBook ? (<>

        {!firstBook.chaptersCollection.items[chapterNumber - 1] ? (
          <>
            {router.isFallback ? (
              <Layout preview={preview} title={'Loading...'} desc={''}>
                <div>読み込み中です。</div>
              </Layout>
            ) : (
                <Layout preview={preview} title={'404 Not found'} desc={''}>
                  <ErrorPage title="チャプターが見つかりませんでした" statusCode={404} />
                </Layout>
              )}
          </>
        ) : (
            <Layout preview={preview} title={firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
              <div className="mt-6">
                <Container>
                  {firstBook.chaptersCollection.items[chapterNumber - 1] && (
                    <div className="px-4 text-left w-screen lg:w-auto mx-auto">
                      <div
                        className="overflow-hidden globalStyle_content mx-auto mb-12" style={{ maxWidth: '650px' }}>
                        <h2 className="text-xl font-bold mb-6">{firstBook.chaptersCollection.items[chapterNumber - 1].title}</h2>
                        <MarkdownRender source={firstBook.chaptersCollection.items[chapterNumber - 1].md} />
                      </div>
                    </div>
                  )}
                  {<div className="px-4">{moreBooks && moreBooks.length > 0 && <BookList mode="more" books={moreBooks} />}</div>}
                </Container>
              </div>
            </Layout>
          )}
      </>
      ) : (
          <Layout preview={preview} title={'404 Book Not found'} desc={''}>
            <ErrorPage title="本が見つかりませんでした" statusCode={404} />
          </Layout>
        )}
    </>
  )
}


interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview }: GSProps) {

  console.log(params)
  const books = await getBookAndMoreBooks(params.slug, preview)
  console.log(books)

  return {
    props: {
      preview: preview ?? false,
      firstBook: books.book ?? null,
      chapterNumber: params.chapterNumber.toString() ?? 1,
      moreBooks: books.moreBooks ?? [],
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allBooks = await getAllBooksWithSlug()

  return {
    paths: allBooks?.map((book: Book) => {
      return book.chaptersCollection.items.map(
        // Making URLs easy to understand by adding one
        (chapter: any, num: number) => {
          return {
            params: {
              slug: book.slug,
              chapterNumber: (num + 1).toString()
            }
          }
        }
      )
    })[0] || [],
    fallback: true,
  }
}