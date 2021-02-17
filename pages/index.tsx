import Link from 'next/link'

import Logo from '../components/Logo'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Mockup from '../components/Mockup'
import Question from '../components/Question'


const IndexPage = () => {

  const mockupList = [
    "/mockup/1.png",
    "/mockup/2.png",
    "/mockup/3.png"
  ]

  const texArray:string[][] = [
    ['次の定積分を求めよ', '$\\int_{1}^{2} (x-1)^{2}dx$'],
    ['日本語に訳せ', 'My Engrish is bad!!!!!!!!!']
  ]

  return (
    <Layout title="Pawaa.app">

      <Container>
        <div className="max-w-3xl flex flex-col">
          <div className="mb-16 md:mr-10">
            <div className="font-bold text-4xl md:text-6xl">
              <p>広告のように</p>
              <p>問題を</p>
              <p>レコメンド</p>
              <p>してくる</p>
              <p>参考書アプリ</p>
            </div>
            <div className="my-10 flex flex-col">
              {texArray.map(
                (question:string[], n:number)=> <Question q={question[0]} tex={question[1]} n={n} />
              )}
            </div>
            <Logo />
          </div>
          <div className="flex flex-col md:flex-row justify-between">

            {mockupList.map(
              (src: string) => (
                <Mockup key={src} src={src} />
              )
            )}

          </div>
        </div>

        <Link href="https://blog.pawaa.app">
          <a className="text-center block text-3xl font-bold p-4 shadow-xl rounded-xl m-4 ">PAWAAAPP MAGAZINE</a>
        </Link>
      </Container>
    </Layout>
  )
}

export default IndexPage
