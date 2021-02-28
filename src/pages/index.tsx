
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import Container from '@/components/common/container'
import Layout from '@/components/partials/layout'
import { getAllPostsForHome, getAllBooksWithSlug, getLandingPage } from '../lib/contentful/graphql'
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
            <div className="w-screen flex mb-6">
              <Container>
                <div className="max-w-3xl flex flex-col items-center justify-center">
                  <div className="flex flex-col align-middle items-center md:flex-row justify-between pt-12">
                    <div className="mb-12 mt-6 md:mt-0 mr-10 font-bold text-3xl whitespace-nowrap leading-loose">
                      <MarkdownRender source={page.message} />
                    </div>
                    <div className="flex flex-col text-black py-8 relative pt-32">
                      <div className="flex flex-col z-20 mt-4">
                        {(page.postsCollection && page.postsCollection.items.length > 0) && page.postsCollection.items.map(
                          (post: LandingPagePost, n: number) => <LandingPagePostComponent key={post.slug} post={post} n={n} />
                        )}
                      </div>
                      <div className="w-full absolute top-0">
                        <div className="mx-auto rounded-xl shadow-2xl overflow-hidden" style={{ width: "300px", height: "480px" }}>
                          <Image src={page.topImage.url} width="300" height="480" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <div className="bg-white w-screen flex items-center justify-center">
              <Container>
                <div className="w-max-3xl mx-auto text-center">
                  <div className="mb-16">
                    <h1><Logo /></h1>
                  </div>
                  <div className="mb-16">
                    <MarkdownRender source={page.md} />
                  </div>

                  <div className="grid gap-x-10 md:grid-flow-col md:auto-cols-max">

                    {(page.screenshotsCollection && page.screenshotsCollection.items.length > 0) && page.screenshotsCollection.items.map(
                      (sc: Screenshot) => <Mockup key={sc.url} src={sc.url} />
                    )}

                  </div>
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
  const allBooksPublished = (await getAllBooksWithSlug(false)) || []
  const postsPublished = (await getAllPostsForHome(false, 10)) || []

  publishRss(allBooksPublished, postsPublished)
  publishSitemap(allBooksPublished, postsPublished)

  return {
    props: {
      page: page ?? null,
      preview
    },
  }
}
