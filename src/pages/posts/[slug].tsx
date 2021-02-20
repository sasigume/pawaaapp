
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import PostHeader from '../../components/post-header'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/Layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import Head from 'next/head'
import { SITE_NAME } from '../../lib/constants'
import { Post } from '../../lib/types'
import Logo from '../../components/Logo'

interface PostProps {
  post: Post;
  morePosts: Post[];
  preview: boolean;
}

export default function PostPage({ post, morePosts, preview }: PostProps) {

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {router.isFallback ? (
        <Layout preview={preview} title={'Loading... | ' +SITE_NAME} desc={''}><div>Loading…</div></Layout>
      ) : (
          <Layout preview={preview} title={post.content.title + ' | ' + SITE_NAME} desc={post.content.intro ?? ''}>
            <Logo />
            <Container>
              <article className="max-w-xl mx-auto flex flex-col justify-center">

                <>

                  <Head>
                    <title>
                      {post ? post.content.title : '記事タイトルが設定されていません'} | {SITE_NAME}
                    </title>
                  </Head>
                  <PostHeader
                    slug={post.slug}
                    published_at={post.published_at}
                    first_published_at={post.first_published_at}
                    content={post.content}
                    tag_list={post.tag_list && post.tag_list}
                  />
                  <PostBody md={post.content.long_text ?? ''} />

                  <SectionSeparator />
                  {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </>

              </article>
            </Container>
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
  const postData = await getPostAndMorePosts(params.slug, environment)

  return {
    props: {
      preview: environment,
      post: postData.post,
      morePosts: postData.morePosts,
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
