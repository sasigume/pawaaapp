
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import { Box, Container, Flex, Stack, useColorMode } from '@chakra-ui/react'
import Layout from '@/components/partials/layout'
import { getAllBooksWithSlug, getLandingPage } from '../lib/contentful/graphql'
import { LandingPage } from '@/models/contentful/LandingPage'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import LandingPagePostComponent from '@/components/common/landing-page-post'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
import Image from 'next/image'
interface IndexProps {
  page: LandingPage;
  environment: boolean;
}

interface Screenshot {
  url: string;
}

const Index = ({ page, environment }: IndexProps) => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <>
      {(!page) ? (<>

        {router.isFallback ? (
          <Layout preview={false} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
        ) : (
            (<Layout preview={false} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={environment} title={page.title} desc={page.description}>

            <Container>

              <Flex mt={10} direction={{ base: "column", md: "row" }} w="full" justifyContent="center" alignItems="center">
                <Flex direction="column" fontWeight="bold" fontSize="xxx-large" mr={10} mb={{ base: 10, md: 0 }}>
                  <MarkdownRender source={page.message} />
                </Flex>
                <Box position="relative">
                  <Box shadow="xl" rounded="xl" overflow="hidden" style={{ width: "300px", height: "480px" }}>
                    <Image src={page.topImage.url} width="300" height="480" />
                  </Box>
                  <Stack position="absolute" top={40} left={10}>
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

              <Stack spacing={4} alignItems="center" direction={{ base: "column", md: "row" }} mb={20}>

                {(page.screenshotsCollection && page.screenshotsCollection.items.length > 0) && page.screenshotsCollection.items.map(
                  (sc: Screenshot) => <Mockup key={sc.url} src={sc.url} />
                )}

              </Stack>
            </Container>
          </Layout>
        )}
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {

  const page = await getLandingPage('index', preview) ?? null

  // Write only published post into RSS/Sitemap
  const allBooksPublished = (await getAllBooksWithSlug(false)) || []

  publishRss(allBooksPublished)
  publishSitemap(allBooksPublished)

  return {
    props: {
      page: page ?? null,
      preview
    },
  }
}
