
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getAllSubjectsWithSlug } from '@/lib/contentful/graphql'
import { Subject } from '@/models/contentful/Subject'

import { Box, VStack, Divider, Container } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import SubjectList from '@/components/partials/book/common/subject-list'
import Loading from '@/components/common/loading'


interface SubjectIndexProps {
  subjects: Subject[];
  preview: boolean;
}


export default function SubjectIndex({ subjects, preview }: SubjectIndexProps) {

  const router = useRouter()

  if (!router.isFallback && !subjects) {
    return (<Layout preview={preview} title={'404 Not found'} desc={''}>
      <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
    </Layout>)
  }

  return (
    <>
      {(!subjects) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="教科が見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={'教科の一覧'} desc={'教科の一覧'}>
            <Container>
              <Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>教科の一覧</h1>
                  <Divider />
                </VStack>
                {subjects && subjects.length > 0 && <SubjectList subjects={subjects} />}
              </Box>
            </Container>
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

  const allSubjects = await getAllSubjectsWithSlug(preview, 10)

  return {
    props: {
      preview: preview ?? false,
      subjects: allSubjects ?? null
    },
    revalidate: 300,
  }
}