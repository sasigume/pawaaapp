import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import BookList from '@/components/partials/book'
import Layout from '@/components/partials/layout'
import { getSubject, getAllSubjectsWithSlug, getAllBooksForSubject } from '@/lib/contentful/graphql'
import { Book } from '@/models/contentful/Book'
import { Subject } from '@/models/contentful/Subject'
import { Box, Container } from '@chakra-ui/react'
import Loading from '@/components/common/loading'
interface IndexProps {
  subject: Subject;
  books: Book[];
  preview: boolean;
}

const SubjectIndex = ({ subject, books, preview }: IndexProps) => {

  const router = useRouter()
  return (
    <>
      {(!subject) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={(`${subject.displayName}の記事一覧`)} desc={"Pawaa.app"}>

            <Container maxW="container.lg">
              <Box py={16}>
                <Box textStyle="h1">
                <h1>{books[0] ? `${subject.displayName}の記事一覧` : `${subject.displayName}の記事はありません`}</h1>
              </Box>
                {subject.description && (<div className="my-4">{subject.description}</div>)}
                {books && books.length > 0 && <BookList mode="archive" books={books} />}
              </Box>
            </Container>

          </Layout>
        )
      }
    </>
  )
}

export default SubjectIndex

interface GSProps {
  params: any
  preview: boolean
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? ''
  let books: Book[]
  const subjectData = await getSubject(slug, preview) ?? null
  subjectData ? books = await getAllBooksForSubject(subjectData.slug, preview) : books = []
  return {
    props: {
      subject: subjectData ?? null,
      preview: preview,
      books: books ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allSubjects = await getAllSubjectsWithSlug()
  return {
    paths: allSubjects?.map((a: any) => `/subjects/${a.slug}`) || [],
    fallback: true,
  }
}
