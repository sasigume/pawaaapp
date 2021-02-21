import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import Head from 'next/head'
import { getAuthorsWithSlug, getAllPostsForAuthor, getAuthor } from '../../lib/api'
import { Post } from '../../lib/types'
import { SITE_NAME } from '../../lib/constants'
interface IndexProps {
  authorName?: string;
  posts: Post[];
  preview: boolean;
}

const AuthorIndex = ({ authorName, posts, preview }: IndexProps) => {

  const router = useRouter()
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {(router.isFallback) ? (
        <Layout preview={preview} title={'Loading... | ' + SITE_NAME} desc={''}><div>Article not found</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${authorName}が書いた記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${authorName}が書いた記事一覧` : `${authorName}が書いた記事はありません`}</h1>
                </div>
                {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
              </Container>
            </div>
          </Layout>
        )
      }
    </>
  )
}

export default AuthorIndex

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {
  const slug = params.slug ?? ''
  let environment
  process.env.NODE_ENV == "development" ? environment = true : environment = false

  const authorData = (await getAuthor(slug,environment)) || ''
  const posts = (await getAllPostsForAuthor(authorData.uuid, environment)) || []

  return {
    props: {
      authorName: authorData.name,
      preview: environment,
      posts: posts
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const allAuthors = await getAuthorsWithSlug()
  console.log('Found auhtos: ', allAuthors)
  return {
    paths: allAuthors?.map((a: any) => `/authors/${a.slug}`) || [],
    fallback: true,
  }
}
