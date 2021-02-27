
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import Mockup from '@/components/common/Mockup'
import MarkdownRender from '@/components/common/MarkdownRender'
import Logo from '@/components/common/Logo'

import Container from '@/components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getAllPostsForHome, getAllCreatorsWithSlug, getLandingPage } from '../lib/contentful/graphql'
import { Post } from '@/models/contentful/Post'
import { LandingPage } from '@/models/contentful/LandingPage'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import LandingPagePostComponent from '@/components/common/landing-page-post'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
interface IndexProps {
  page: LandingPage;
  posts: Post[];
  environment: boolean;
}

interface Screenshot {
  url: string;
}

const Index = ({ page, posts, environment }: IndexProps) => {
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
            <div className="w-screen bg-red-400 text-white flex">
              <Container>
                <div className="max-w-3xl flex flex-col items-center justify-center">
                  <div className="flex flex-col align-middle items-center md:flex-row justify-between">
                    <div className="mr-10 font-bold text-3xl whitespace-nowrap leading-loose">
                      <MarkdownRender source={page.message} />
                    </div>
                    <div className="flex flex-col text-black py-8">
                      {(page.postsCollection && page.postsCollection.items.length > 0) && page.postsCollection.items.map(
                        (post: LandingPagePost, n: number) => <LandingPagePostComponent key={post.slug} post={post} n={n} />
                      )}
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <div className="bg-white z-10 w-screen flex items-center justify-center">
              <Container>
                <div className="mt-20 mb-16">
                  <h1><Logo /></h1>
                </div>

                <div className="grid gap-x-10 md:grid-flow-col md:auto-cols-max">

                  {(page.screenshotsCollection && page.screenshotsCollection.items.length > 0) && page.screenshotsCollection.items.map(
                    (sc:Screenshot) => <Mockup key={sc.url} src={sc.url} />
                  )}

                </div>
              </Container>
            </div>
            <div>
              <Container>
                <h2 className="mt-16 text-4xl mb-8 font-bold">最新の記事</h2>
                {posts.length > 0 && <PostList posts={posts} />}
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

  const posts = (await getAllPostsForHome(preview)) || []

  // Write only published post into RSS/Sitemap
  const allCreatorsPublished = (await getAllCreatorsWithSlug(false)) || []
  const postsPublished = (await getAllPostsForHome(false)) || []

  publishRss(allCreatorsPublished, postsPublished)
  publishSitemap(allCreatorsPublished, postsPublished)

  return {
    props: {
      page: page ?? null,
      posts: posts ?? null,
      preview
    },
  }
}
