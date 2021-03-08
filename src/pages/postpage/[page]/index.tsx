
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'


import { Box, Container, Divider, useColorMode, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllPostsByRange, getAllPostsWithSlug } from '@/lib/contentful/graphql'

import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
import { SITE_DESC, SITE_NAME } from '@/lib/constants'
import Loading from '@/components/common/loading'
import { Post } from '@/models/contentful/Post'
import PostList from '@/components/partials/post'
import { BreakpointContainer } from '@/components/common/breakpoint-container'
import { Pagination } from '@/components/common/pagenation'

interface IndexProps {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  tweetCount: number;
  environment: boolean;
}

const PostPage = ({ posts, totalCount, currentPage, environment, tweetCount }: IndexProps) => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <>
      {(!posts) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
          (<Layout preview={false} title={'404 Not found'} desc={''}>
            <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
          </Layout>)
        )}
      </>) : (
        <Layout preview={environment} title={(`${currentPage}ページ目 | ${SITE_NAME}`)} desc={SITE_DESC} tweetCount={tweetCount}>

          <Container maxW="container.lg">
            <BreakpointContainer>
              {posts && (<Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>{currentPage}ページ目</h1>
                  <Divider />
                </VStack>
                {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
                <Pagination totalCount={totalCount} />
              </Box>)}
            </BreakpointContainer>
          </Container>
        </Layout>
      )}
    </>
  )
}

export default PostPage

interface GSProps {
  preview: boolean
  params: any
}

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600')
const PER_PAGE = parseInt(process.env.PAGINATION ?? '10')

export async function getStaticProps({ preview = false, params }: GSProps) {

  const skipAmount = (params.page - 1) * PER_PAGE

  const allPostsForIndex = (await getAllPostsByRange(false, skipAmount, PER_PAGE)) || []
  // Write only published post into RSS/Sitemap
  const allPostsPublished = (await getAllPostsWithSlug(false, TOTAL_LIMIT)) || []

  return {
    props: {
      posts: allPostsForIndex ?? null,
      totalCount: allPostsPublished.length ?? null,
      currentPage: params.page ?? 1,
      preview: preview ?? null
    },
    // Index shouldn't update so often because of rss/sitemap
    revalidate: 3600
  }
}

export const getStaticPaths = async () => {

  const allPostJson = (await getAllPostsWithSlug(false, 600))

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, Math.ceil(allPostJson.length / PER_PAGE)).map((repo) => `/postpage/${repo}`)

  return {
    paths,
    fallback: false
  };
};