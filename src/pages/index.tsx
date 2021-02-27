
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import { getAllPostsForHome, getAllCreatorsWithSlug, getLandingPage } from '../lib/contentful/graphql'
import { Post } from '@/models/contentful/Post'
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
            <div className="w-screen flex">
              <Container>
                <div className="max-w-3xl flex flex-col items-center justify-center">
                  <div className="flex flex-col align-middle items-center md:flex-row justify-between">
                    <div className="mt-16 md:mt-0 mr-10 font-bold text-6xl whitespace-nowrap leading-loose">
                      <MarkdownRender source={page.message} />
                    </div>
                    <div className="flex flex-col text-black py-8 relative pt-32 mt-6">
                      <div className="z-20 mt-4">
                        {(page.postsCollection && page.postsCollection.items.length > 0) && page.postsCollection.items.map(
                        (post: LandingPagePost, n: number) => <LandingPagePostComponent key={post.slug} post={post} n={n} />
                      )}
                      </div>
                      <div className="absolute top-0 right-16 rounded-xl shadow-2xl overflow-hidden" style={{height: "480px"}}>
                        <Image src={page.topImage.url} width="300" height="480" />
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <div className="bg-white w-screen flex items-center justify-center">
              <Container>
                <div className="mt-6 mb-12">
                  <h1><Logo /></h1>
                </div>

                <div className="grid gap-x-10 md:grid-flow-col md:auto-cols-max">

                  {(page.screenshotsCollection && page.screenshotsCollection.items.length > 0) && page.screenshotsCollection.items.map(
                    (sc: Screenshot) => <Mockup key={sc.url} src={sc.url} />
                  )}

                </div>
              </Container>
            </div>
          </Layout>
        )}
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {

  const page = await getLandingPage('index', preview) ?? null

  // Write only published post into RSS/Sitemap
  const allCreatorsPublished = (await getAllCreatorsWithSlug(false)) || []
  const postsPublished = (await getAllPostsForHome(false, 10)) || []

  publishRss(allCreatorsPublished, postsPublished)
  publishSitemap(allCreatorsPublished, postsPublished)

  return {
    props: {
      page: page ?? null,
      preview
    },
  }
}
