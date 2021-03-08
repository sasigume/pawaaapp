
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import { Box, Center, Container, Divider, Flex, Stack, useColorMode, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllPostsWithSlug, getLandingPage } from '../lib/contentful/graphql'
import { LandingPage } from '@/models/contentful/LandingPage'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import LandingPagePostComponent from '@/components/common/landing-page-post'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
import Image from 'next/image'
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/lib/constants'
import Loading from '@/components/common/loading'
import { Post } from '@/models/contentful/Post'
import PostList from '@/components/partials/post'
interface IndexProps {
  posts: Post[];
  tweetCount: number;
  environment: boolean;
}

const Index = ({ posts, environment, tweetCount }: IndexProps) => {
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

              {posts && (<Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>最近更新された記事</h1>
                  <Divider />
                </VStack>
                {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
              </Box>)}
            </Container>
          </Layout>
        )}
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {

  const searchWord = SITE_URL

  //const tweets = await fetch(process.env.HTTPS_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  //const tweetsJson = await tweets.json()
  //let tweetCount
  //tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  const allPostsForIndex = (await getAllPostsWithSlug(false,7)) || []
  // Write only published post into RSS/Sitemap
  const allPostsPublished = (await getAllPostsWithSlug(false,600)) || []

  publishRss(allPostsPublished)
  publishSitemap(allPostsPublished)

  return {
    props: {
      posts: allPostsForIndex ?? null,
      //tweetCount: tweetCount ?? null,
      preview: preview ?? null
    },
    // Index shouldn't update so often because of rss/sitemap
    revalidate: 14400
  }
}
