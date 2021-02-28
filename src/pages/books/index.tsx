
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getAllBooksForHome } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'

import { Container } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import BookList from '@/components/partials/book-list'


interface BookIndexProps {
  books: Book[];
  preview: boolean;
}


export default function BookIndex({ books, preview }: BookIndexProps) {

  const router = useRouter()

  if (!router.isFallback && !books) {
    return (<Layout preview={preview} title={'404 Not found'} desc={''}>
      <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
    </Layout>)
  }

  return (
    <>
      {(!books) ? (<>

        {router.isFallback ? (
          <Layout preview={preview} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="本が見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={'本の一覧'} desc={'本の一覧です'}>
            <div className="mt-6">
              <Container>
                {<div className="px-4">{books && books.length > 0 && <BookList mode="archive" books={books} />}</div>}
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

export async function getStaticProps({ preview }: GSProps) {

  const allBooks = await getAllBooksForHome(preview, 10)

  return {
    props: {
      preview: preview ?? false,
      books: allBooks ?? null
    },
    revalidate: 300,
  }
}