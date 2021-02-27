
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'
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

  // if chapter includes alphabet return NaN to prevent parsing number from mixed string
  // otherwise string like '1aaa' is somehow considered as chapter number
  const includeAlphabet = new RegExp(`[A-Za-z]`)
  let intChapterNumber: number
  includeAlphabet.test(chapterNumber) ? intChapterNumber = NaN : intChapterNumber = parseInt(chapterNumber)

  const PageButtons = () => (
    <div className="flex no-underline text-md font-bold items-center shadow-xl rounded-xl overflow-hidden">
      {intChapterNumber != 1 && (
      <Link href={(`/books/${firstBook.slug}/chapters/${intChapterNumber - 1}`)}>
        <a className="flex p-4 bg-red-800 flex-grow ">
          <span className="text-white ">&lt; 前ページ</span>
        </a>
      </Link>)}
      <Link href={(`/books/${firstBook.slug}`)}>
        <a className="flex p-4 bg-blue-500 justify-center flex-grow ">
          <span className="text-white ">目次へ</span>
        </a>
      </Link>
      {(intChapterNumber) < firstBook.chaptersCollection.items.length && (<Link href={(`/books/${firstBook.slug}/chapters/${intChapterNumber + 1}`)}>
        <a className="flex p-4 bg-green-800 justify-end flex-grow ">
          <span className="text-white ">次ページ &gt;</span>
        </a>
      </Link>)}
    </div>

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
            <Layout preview={preview} title={target.title + ' | ' + firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
              <div className="mt-6">
                <Container>
                  {target && (
                    <div className="text-left lg:w-auto mx-auto">

                      <div
                        className="overflow-x-hidden globalStyle_content mx-auto mb-12" style={{ maxWidth: '650px' }}>
                        <Link href={(`/books/${firstBook.slug}`)}>
                          <a className="">
                            <h1 className="no-underline text-black text-2xl mb-6 font-bold border-b-2 pb-3 border-gray-300">{firstBook.title}</h1>
                          </a>
                        </Link>
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

              // Dynamic route only accepts string
            }
          }
        }
      )
    })[0] || [],
    fallback: true,
  }
}