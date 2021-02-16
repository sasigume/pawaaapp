import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Pawaa.app">
    <h1 className="font-bold text-4xl">Pawaa.app</h1>
    <p>
      <Link href="https://blog.pawaa.app">
        <a className="block text-3xl font-bold p-4 shadow-xl rounded-xl m-4 bg-yellow-100">Blog</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
