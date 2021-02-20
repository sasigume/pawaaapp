
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import Layout from '@/components/partials/layout'
import { getAllPostsWithSlug, getPostsForSinglePage } from '@/lib/api'
import Head from 'next/head'
import { SITE_NAME } from '@/lib/constants'
import { Post } from '@/lib/types'
import PostList from '@/components/partials/post-list'

interface PostPageProps {
  firstPost: Post;
  morePosts: Post[];
  preview: boolean;
}

export default function PostPage({ firstPost, morePosts, preview }: PostPageProps) {

  const router = useRouter()
  if (!router.isFallback && !firstPost) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {(router.isFallback) ? (
        <Layout preview={preview} title={'Loading... | ' +SITE_NAME} desc={''}><div>Loading…</div></Layout>
      ) : (
          <Layout preview={preview} title={firstPost.content.title + ' | ' + SITE_NAME} desc={firstPost.content.intro ?? ''}>
            <Head>
              <title>{firstPost.content.title + ' | ' + SITE_NAME}</title>
            </Head>
            <div>
              <Container>
                {firstPost && <PostList mode="single" posts={[firstPost]} />}
                {morePosts && morePosts.length > 0 && <PostList mode="more" posts={morePosts} />}
              </Container>
            </div>
          </Layout>
        )}
    </>)
}

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {

  let environment: boolean
  process.env.NODE_ENV == "development" ? environment = true : environment = false
  const posts = await getPostsForSinglePage(params.slug, environment)

  return {
    props: {
      preview: environment,
      firstPost: posts.firstPost,
      morePosts: posts.morePosts
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post: Post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
