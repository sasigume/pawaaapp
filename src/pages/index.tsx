
import dynamic from 'next/dynamic'
import ErrorPage from 'next/error'
import { Box, Container, Divider, useColorMode, VStack } from '@chakra-ui/react'
import { getAllPostsWithSlug } from '../lib/contentful/graphql'
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/lib/constants'
import { Post } from '@/models/contentful/Post'

import publishAdsTxt from '@/lib/adstxt'
import publishRobotsTxt from '@/lib/robotstxt'
import Layout from '@/components/partials/layout'

const Pagination = dynamic(() => import('@/components/common/pagenation'))
const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'))
const PostList = dynamic(() => import('@/components/partials/post'))

interface IndexProps {
  posts: Post[];
  totalCount: number;
  tweetCount: number;
  environment: boolean;
}

const Index = ({ posts, totalCount, environment, tweetCount }: IndexProps) => {

  const { colorMode } = useColorMode()
  return (
    <>
      {!posts ? <Layout preview={false} title={'404 Not found'} desc={''}>
        <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
      </Layout>
        : (
          <Layout preview={environment} title={SITE_NAME} desc={SITE_DESC} tweetCount={tweetCount}>
            <Container bg={colorMode == "light" ? "white" : "dark"} maxW="container.lg">

              <BreakpointContainer>
                {posts && (
                  <Box mt={6} mb={10}>
                    <VStack textStyle="h1" spacing={4} mb={8}>
                      <h2>最近更新された記事</h2>
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

export default Index

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600')
const PER_PAGE = parseInt(process.env.PAGINATION ?? '10')

export async function getStaticProps({ preview = false }) {

  const searchWord = SITE_URL

  const tweets = await fetch(process.env.API_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.meta ? tweetCount = tweetsJson.meta.result_count : tweetCount = null


  const allPostsForIndex = (await getAllPostsWithSlug(false, PER_PAGE)) || []
  const allPostsPublished = (await getAllPostsWithSlug(false, TOTAL_LIMIT)) || []

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800')

  publishAdsTxt()
  publishRobotsTxt()

  return {
    props: {
      posts: allPostsForIndex ?? null,
      totalCount: allPostsPublished.length ?? null,
      tweetCount: tweetCount ?? null,
      preview: preview ?? null,
    },
    revalidate: revalEnv
  }
}
