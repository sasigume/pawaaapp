
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'


import { Box, Container, Divider, useColorMode, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllPlatformsWithSlug, getAllPostsWithSlug } from '../lib/contentful/graphql'
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/lib/constants'
import Loading from '@/components/common/loading'
import { Post } from '@/models/contentful/Post'
import PostList from '@/components/partials/post'
import { BreakpointContainer } from '@/components/common/breakpoint-container'
import { Pagination } from '@/components/common/pagenation'
import { Platform } from '@/models/contentful/Platform'
import publishAdsTxt from '@/lib/adstxt'
import Image from 'next/image'
import HeroWithThumbnails from '@/components/common/hero-with-thumbnails'
import publishRobotsTxt from '@/lib/robotstxt'
interface IndexProps {
  posts: Post[];
  totalCount: number;
  tweetCount: number;
  environment: boolean;
  allPlatforms: Platform[]
}

const Index = ({ posts, totalCount, environment, tweetCount, allPlatforms }: IndexProps) => {

  return (
    <>
      {!posts ? <Layout preview={false} title={'404 Not found'} desc={''}>
        <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
      </Layout>
        : (
          <Layout platforms={allPlatforms} preview={environment} title={SITE_NAME} desc={SITE_DESC} tweetCount={tweetCount}>
            <HeroWithThumbnails totalCount={totalCount} />
            <Container bg="white" maxW="container.lg">

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

  const allPlatforms = await getAllPlatformsWithSlug(preview, 10)

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
      allPlatforms: allPlatforms ?? null
    },
    revalidate: revalEnv
  }
}
