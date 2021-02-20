import Logo from '../components/Logo'
import Mockup from '../components/Mockup'
import Question from '../components/Question'
import Container from '../components/Container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/Layout'
import { getAllPostsForHome, getAllAuthorsForHome } from '../lib/api'
import { Post } from '../lib/types'
import { SITE_NAME,SITE_DESC } from '@/lib/constants'
import publishRss from '@/lib/rss'
interface IndexProps {
  allPosts: Post[];
  preview: boolean;
}

const Index = ({ allPosts, preview }: IndexProps) => {

  const mockupList = [
    "/mockup/1.png",
    "/mockup/2.png",
    "/mockup/3.png"
  ]

  const texArray: string[][] = [
    ['次の定積分を求めよ', '$\\int_{1}^{2} (x-1)^{2}dx$'],
    ['日本語に訳せ', 'My Engrish is bad!!!!!!!!!']
  ]

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <Layout preview={preview} title={SITE_NAME} desc={SITE_DESC}>
      <div className="w-screen bg-red-400 text-white flex">
        <Container>
          <div className="max-w-3xl flex flex-col items-center justify-center">
            <div className="flex flex-col align-middle items-center md:flex-row justify-between">
              <div className="mt-10 md:mt-0 mr-10 font-bold text-3xl md:text-5xl mb-20 md:mb-0">
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
            <Logo />
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
          {heroPost && (
            <HeroPost
              title={heroPost.content.title}
              coverImage={heroPost.content.image}
              date={heroPost.first_published_at || heroPost.published_at}
              author={heroPost.content.author}
              slug={heroPost.slug}
              excerpt={heroPost.content.intro}
              tag_list={heroPost.tag_list ?? []}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  const allAuthors = (await getAllAuthorsForHome(preview)) || []
  
  publishRss(allAuthors,allPosts)

  return {
    props: { allPosts, preview },
  }
}
