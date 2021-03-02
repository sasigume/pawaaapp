
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import { Box, Center, Container, Divider, Flex, Stack, useColorMode, VStack } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllBooksWithSlug, getLandingPage } from '../lib/contentful/graphql'
import { LandingPage } from '@/models/contentful/LandingPage'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import LandingPagePostComponent from '@/components/common/landing-page-post'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
import Image from 'next/image'
import { SITE_URL } from '@/lib/constants'
import Loading from '@/components/common/loading'
import { Book } from '@/models/contentful/Book'
import BookList from '@/components/partials/book'
interface IndexProps {
  page: LandingPage;
  books: Book[];
  tweetCount: number;
  environment: boolean;
}

interface Screenshot {
  url: string;
}

const Index = ({ page, books, environment, tweetCount }: IndexProps) => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <>
      {(!page) ? (<>

        {router.isFallback ? (
          <Loading />
        ) : (
            (<Layout preview={false} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={environment} title={page.title} desc={page.description} tweetCount={tweetCount}>

            <Container maxW="container.lg">

              <Flex mt={10} direction={{ base: "column", md: "row" }} w="full" justifyContent="center" alignItems="center">
                <Flex direction="column" fontWeight="bold" fontSize="xxx-large" mr={10} mb={{ base: 10, md: 0 }}>
                  <MarkdownRender source={page.message} />
                </Flex>
                <Box position="relative">
                  <Box shadow="xl" rounded="xl" overflow="hidden" style={{ width: "300px", height: "480px" }}>
                    <Image src={page.topImage.url} width="300" height="480" />
                  </Box>
                  <Stack position="absolute" top={40} left={0}>
                    {(page.postsCollection && page.postsCollection.items.length > 0) && page.postsCollection.items.map(
                      (post: LandingPagePost, n: number) => <LandingPagePostComponent key={post.slug} post={post} n={n} />
                    )}
                  </Stack>
                </Box>
              </Flex>

              <Flex mt={40} mb={10} direction="column" alignItems="center">
                <Logo fill={colorMode == "light" ? "#000" : "#fff"} />
                <Stack my={10}>
                  <MarkdownRender source={page.md} />
                </Stack>
              </Flex>

              {books && (<Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>最近更新された本</h1>
                  <Divider />
                </VStack>
                {books && books.length > 0 && <BookList mode="archive" books={books} />}
              </Box>)}
            </Container>
          </Layout>
        )}
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {

  const page = await getLandingPage('index', preview) ?? null

  const searchWord = SITE_URL

  const tweets = await fetch(process.env.HTTPS_URL + '/api/twitter?word=' + encodeURIComponent(searchWord) + '&secret=' + process.env.TWITTER_SECRET)
  const tweetsJson = await tweets.json()
  let tweetCount
  tweetsJson.data ? tweetCount = tweetsJson.data.length : tweetCount = null

  // Write only published post into RSS/Sitemap
  const allBooksPublished = (await getAllBooksWithSlug(false)) || []

  publishRss(allBooksPublished)
  publishSitemap(allBooksPublished)

  return {
    props: {
      page: page ?? null,
      books: allBooksPublished ?? null,
      tweetCount: tweetCount ?? null,
      preview: preview ?? null
    },
    revalidate: 300
  }
}
