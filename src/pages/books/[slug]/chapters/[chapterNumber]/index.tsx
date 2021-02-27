
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
import Link from 'next/link'


interface BookChapterPageProps {
  firstBook: Book;
  moreBooks: Book[];
  chapterNumber: string;
  preview: boolean;
}


export default function BookChapterPage({ firstBook, moreBooks, chapterNumber, preview }: BookChapterPageProps) {

  const router = useRouter()

  const intChapterNumber = parseInt(chapterNumber)

  const PageButtons = () => (
    <div className="flex flex-wrap no-underline text-sm font-bold justify-center items-center">
      {intChapterNumber != 1 && (<Link href={(`/books/${firstBook.slug}/chapters/${intChapterNumber - 1}`)}>
        <a className="flex rounded-xl shadow-xl p-2 m-2 bg-red-800 ">
          <span className="text-white ">&lt; 前のページ</span>
        </a>
      </Link>)}
      <Link href={(`/books/${firstBook.slug}`)}>
        <a className="flex rounded-xl shadow-xl p-2 m-2 bg-blue-500">
          <span className="text-white ">目次に戻る</span>
        </a>
      </Link>
      {(intChapterNumber) < firstBook.chaptersCollection.items.length && (<Link href={(`/books/${firstBook.slug}/chapters/${intChapterNumber + 1}`)}>
        <a className="flex rounded-xl shadow-xl p-2 m-2 bg-green-800">
          <span className="text-white ">次のページ &gt;</span>
        </a>
      </Link>)}
    </div>

  )

  const target = firstBook.chaptersCollection.items[intChapterNumber - 1]

  return (
    <>
      {firstBook ? (<>

        {!target ? (
          <>
            {router.isFallback ? (
              <Layout preview={preview} title={'404 Book Not found'} desc={''}>
                <ErrorPage title="本が見つかりませんでした" statusCode={404} />
              </Layout>
            ) : (
                <Layout preview={preview} title={'404 Chapter Not found'} desc={''}>
                  <div className="mt-6">
                    <Container>
                      <div className="my-20 text-center">
                        <div>404 Chapter Not found</div>

                        <Link href={(`/books/${firstBook.slug}`)}>
                          <a className="block p-8 shadow-xl rounded-xl m-4 border-2">目次へ</a>
                        </Link>
                      </div>
                    </Container>
                  </div>
                </Layout>
              )}
          </>
        ) : (
            <Layout preview={preview} title={target.title + ' | ' + firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
              <div className="mt-6">
                <Container>
                  {target && (
                    <div className="px-4 text-left w-screen lg:w-auto mx-auto">

                      <div
                        className="overflow-hidden globalStyle_content mx-auto mb-12" style={{ maxWidth: '650px' }}>
                        <PageButtons />
                        <div className="my-2 md:my-8">
                          <h2 className="text-xl font-bold mb-6">{target.title}</h2>
                          <MarkdownRender source={target.md} />
                        </div>
                        <PageButtons />
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

          <Layout preview={preview} title={'Loading...'} desc={''}>
            <div>読み込み中です。</div>
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

  const books = await getBookAndMoreBooks(params.slug, preview)
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
              chapterNumber: num.toString()
            }
          }
        }
      )
    })[0] || [],
    fallback: true,
  }
}