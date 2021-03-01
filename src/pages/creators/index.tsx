
import { useRouter } from 'next/router'

import ErrorPage from 'next/error'

import { getAllCreatorsWithSlug } from '@/lib/contentful/graphql'
import { Creator } from '@/models/contentful/Creator'

import { Box, Container, Divider, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import CreatorList from '@/components/partials/book/common/creator-list'
import Loading from '@/components/common/loading'


interface CreatorIndexProps {
  creators: Creator[];
  preview: boolean;
}


export default function CreatorIndex({ creators, preview }: CreatorIndexProps) {

  const router = useRouter()

  if (!router.isFallback && !creators) {
    return (<Layout preview={preview} title={'404 Not found'} desc={''}>
      <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
    </Layout>)
  }

  return (
    <>
      {(!creators) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="クリエイターが見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={'クリエイターの一覧'} desc={'クリエイターの一覧'}>
            <Container>
              <Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>最近更新された本</h1>
                  <Divider />
                </VStack>
                {creators && creators.length > 0 && <CreatorList creators={creators} />}
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

  const allCreators = await getAllCreatorsWithSlug(preview, 10)

  return {
    props: {
      preview: preview ?? false,
      creators: allCreators ?? null
    },
    revalidate: 300,
  }
}