import { GetStaticProps } from 'next'
import Link from 'next/link'

import Logo from '../components/Logo'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Mockup from '../components/Mockup'
import Question from '../components/Question'

import Storyblok from "../lib/storyblok"


const IndexPage = (props:any) => {

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
    <Layout title="Pawaa.app">
      <div className="w-screen bg-red-400 text-white">
        <Container>
          <div className="max-w-3xl flex flex-col">
            <div className="flex flex-col align-middle items-center md:flex-row justify-between">
              <div className="mt-10 md:mt-0 mr-10 font-bold text-3xl md:text-5xl mb-20 md:mb-0">
                <p>問題が</p>
                <p>「流れる」</p>
                <p>学習アプリ</p>
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
      <div className="bg-white -mt-16 z-10 w-screen">
        <Container>
          <div className="mt-10 mb-16">
            <Logo />
          </div>
          <h1>{ props.story ? props.story.name : 'My Site' }</h1>
          <div className="grid gap-x-10 md:grid-flow-col md:auto-cols-max">

            {mockupList.map(
              (src: string) => (
                <Mockup key={src} src={src} />
              )
            )}

          </div>

          <Link href="https://blog.pawaa.app">
            <a className="text-center block text-3xl font-bold p-4 shadow-xl rounded-xl mb-16">開発日記はこちら</a>
          </Link>
        </Container>
      </div>
    </Layout >
  )
}

export default IndexPage

export const getStaticProps:GetStaticProps = async (context:any) => {
  // the slug of the story
  let slug = "home"
  // the storyblok params
  let params = {
    version: "draft", // or 'published'
    cv: 0
  }

  // checks if Next.js is in preview mode
  if (context.preview) {
    // loads the draft version
    params.version = "draft"
    // appends the cache version to get the latest content
    params.cv = Date.now()
  }

  // loads the story from the Storyblok API
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, params)

  // return the story from Storyblok and whether preview mode is active
  return {
    props: {
      story: data ? data.story : false,
      preview: context.preview || false
    },
    revalidate: 10, 
  }
}
