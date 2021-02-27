
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getBookAndMoreBooks, getAllBooksWithSlug } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'
import SectionSeparator from '@/components/common/section-separator'


interface BookPageProps {
  firstBook: Book;
  moreBooks: Book[];
  preview: boolean;
}


export default function BookPage({ firstBook, moreBooks, preview }: BookPageProps) {

  const router = useRouter()

  if (!router.isFallback && !firstBook) {
    return (<Layout preview={preview} title={'404 Not found'} desc={''}>
      <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
    </Layout>)
  }

  return (
    <>
      {(!firstBook) ? (<>

        {router.isFallback ? (
          <Layout preview={preview} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="本が見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={firstBook.title} desc={firstBook.description ? firstBook.description : ''}>
            <div className="mt-6">
              <Container>
                {firstBook && <BookList mode="single" books={[firstBook]} />}
                {<div className="px-4">{moreBooks && moreBooks.length > 0 && <BookList mode="more" books={moreBooks} />}</div>}
              </Container>
            </div>
          </Layout>
        )
      }
    </>)
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
      moreBooks: books.moreBooks ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allBooks = await getAllBooksWithSlug()
  return {
    paths: allBooks?.map((book: Book) => `/books/${book.slug}`) || [],
    fallback: true,
  }
}
