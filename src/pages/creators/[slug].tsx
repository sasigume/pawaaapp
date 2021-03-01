import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Box, Container } from '@chakra-ui/react'
import BookList from '@/components/partials/book'
import Layout from '@/components/partials/layout'
import { getAllCreatorsWithSlug, getAllBooksForCreator, getCreator } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'
import { Creator } from '@/models/contentful/Creator'
import Loading from '@/components/common/loading'
interface IndexProps {
  creator?: Creator
  books: Book[]
  preview: boolean
}

const CreatorIndex = ({ creator, books, preview }: IndexProps) => {
  const router = useRouter()
  return (
    <>
      {(!creator) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>

      ) : (
          <Layout preview={preview} title={(`${creator?.displayName}が書いた本一覧`)} desc={"Pawaa.app"}>
            <Container>
              <Box py={16}>
                <Box textStyle="h1">
                  <h1 className="text-2xl font-bold my-10">{books[0] ? `${creator.displayName}が書いた本一覧` : `${creator?.displayName}が書いた記事はありません`}</h1>
                </Box>
                {creator.description && (<div className="my-4">{creator.description}</div>)}
                {books && books.length > 0 && <BookList mode="archive" books={books} />}
              </Box>
            </Container>
          </Layout>
        )
      }
    </>
  )
}

export default CreatorIndex

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? ''

  let books: (Book[] | null)
  const creatorData = (await getCreator(slug, preview)) ?? null
  creatorData ? books = (await getAllBooksForCreator(creatorData.slug, preview)) : books = []

  return {
    props: {
      creator: creatorData ?? null,
      preview: preview,
      books: books ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths({ preview = false }) {
  const allCreators = await getAllCreatorsWithSlug(preview)
  return {
    paths: allCreators?.map((a: any) => `/creators/${a.slug}`) || [],
    fallback: true,
  }
}
