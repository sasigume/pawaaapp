
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'


import { Box, Container, Divider, useColorMode, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllPostsWithSlug } from '../lib/contentful/graphql'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/lib/constants'
import Loading from '@/components/common/loading'
import { Post } from '@/models/contentful/Post'
import PostList from '@/components/partials/post'
import { BreakpointContainer } from '@/components/common/breakpoint-container'
import { Pagination } from '@/components/common/pagenation'
interface IndexProps {
  posts: Post[];
  totalCount: number;
  tweetCount: number;
  environment: boolean;
}

const Index = ({ posts,totalCount, environment, tweetCount }: IndexProps) => {
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
        <Layout preview={environment} title={SITE_NAME} desc={SITE_DESC} tweetCount={tweetCount}>

          <Container maxW="container.lg">
            <BreakpointContainer>
              {posts && (<Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>最近更新された記事</h1>
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

export async function getStaticProps({ preview = false }) {

  const searchWord = SITE_URL

  const tweets = await fetch(process.env.API_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  const allPostsForIndex = (await getAllPostsWithSlug(false, 7)) || []
  // Write only published post into RSS/Sitemap
  const allPostsPublished = (await getAllPostsWithSlug(false, TOTAL_LIMIT)) || []

  publishRss(allPostsPublished)
  publishSitemap(allPostsPublished)

  return {
    props: {
      posts: allPostsForIndex ?? null,
      totalCount: allPostsPublished.length ?? null,
      tweetCount: tweetCount ?? null,
      preview: preview ?? null
    },
    // Index shouldn't update so often because of rss/sitemap
    revalidate: 14400
  }
}
