import Link from 'next/link'

import Logo from '../components/Logo'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Mockup from '../components/Mockup'



const IndexPage = () => {

  const mockupList = [
    "/mockup/1.png",
    "/mockup/2.png",
    "/mockup/3.png"
  ]
  return (
    <Layout title="Pawaa.app">

      <Container>
        <div className="max-w-3xl flex flex-col">
          <div className="mb-16 md:mr-10">
            <div className="font-bold text-4xl md:text-6xl">
              <p>レコメンドに溺れる</p><p>学生たちを</p><p>レコメンドで救う。</p>
            </div>
            <div className="my-10">
              <p>一人一台PC/タブレット端末を持つ時代。様々なeラーニングの手法が確立され、日々「学習」カテゴリのアプリは増え続けています。</p>
              <p>しかし、いくら機会に恵まれている学生でも、ソーシャルネットワーク上のレコメンドには勝てません。</p>
              <p>レコメンドのアルゴリズムが、学生にとって「良心的」ならば。</p>
              <p>そこで私たちは提案します。</p>
              <p>レコメンドを核としたソーシャルメディア型学習プラットフォーム。</p>
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
          <a className="text-center block text-3xl font-bold p-4 shadow-xl rounded-xl m-4 ">VISIT PAWAAAPP MAGAZINE</a>
        </Link>
      </Container>
    </Layout>
  )
}

export default IndexPage
