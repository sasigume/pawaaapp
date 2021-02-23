import Logo from '@/components/common/Logo'
import Mockup from '@/components/common/Mockup'
import Question from '@/components/common/Question'
import Container from '@/components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getAllPostsForHome, getAllCreatorsForHome } from '../lib/storyblok/api'
import { Post } from '@/models/Post'
import { SITE_NAME, SITE_DESC } from '@/lib/constants'
import publishRss from '@/lib/rss'
import publishSitemap from '@/lib/sitemap'
interface IndexProps {
  posts: Post[];
  environment: boolean;
}

const Index = ({ posts, environment }: IndexProps) => {

  const mockupList = [
    "/mockup/1.png",
    "/mockup/2.png",
    "/mockup/3.png"
  ]

  const texArray: string[][] = [
    ['次の定積分を求めよ', '$\\int_{1}^{2} (x-1)^{2}dx$'],
    ['日本語に訳せ', 'My Engrish is bad!!!!!!!!!']
  ]

  return (
    <Layout preview={environment} title={SITE_NAME} desc={SITE_DESC}>
      <div className="w-screen bg-red-400 text-white flex">
        <Container>
          <div className="max-w-3xl flex flex-col items-center justify-center">
            <div className="flex flex-col align-middle items-center md:flex-row justify-between">
              <div className="mt-6 md:mt-0 mr-10 font-bold text-3xl md:text-5xl mb-12 md:mb-0 leading-tight">
                <p>問題が</p>
                <p>「流れる」</p>
                <p>学習アプリ</p>
                <p>パワーアップ</p>
              </div>
              <div className="flex flex-col text-black py-8">
                <div className="bg-gray-200 -mt-16 ml-16 inline-block m-4 p-4 border-2 border-gray-200 rounded-xl shadow-xl">
                  あああああ!!<br />今日もラーメンが美味しいなあ
                </div>
                {texArray.map(
                  (question: string[], n: number) => <Question key={n} q={question[0]} tex={question[1]} n={n} />
                )}
                <div className="bg-gray-200 mr-16 inline-block m-4 p-4 border-2 border-gray-200 rounded-xl shadow-xl">
                  あああああ!!<br />今日もラーメンが美味しいなあ
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-white -mt-16 z-10 w-screen flex items-center justify-center">
        <Container>
          <div className="mt-20 mb-16">
            <h1><Logo /></h1>
          </div>

          <div className="grid gap-x-10 md:grid-flow-col md:auto-cols-max">

            {mockupList.map(
              (src: string) => (
                <Mockup key={src} src={src} />
              )
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
  )
}

export default Index

export async function getStaticProps() {
  let environment: boolean
  process.env.NODE_ENV == "development" ? environment = true : environment = false
  const posts = (await getAllPostsForHome(environment)) || []
  const allCreators = (await getAllCreatorsForHome(environment)) || []

  publishRss(allCreators, posts)
  publishSitemap(allCreators, posts)

  return {
    props: { posts, environment },
  }
}
