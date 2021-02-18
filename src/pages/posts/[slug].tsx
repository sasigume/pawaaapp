import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import PostHeader from '@/components/post-header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { Post } from '@/lib/types'

interface PostProps {
  post: Post;
  morePosts: Post[];
  preview: boolean;
}

export default function PostPage({ post, morePosts, preview }:PostProps) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.content.title} | {CMS_NAME}
                </title>
                <meta property="og:image" content={post.content.image} />
              </Head>
              <PostHeader
                title={post.content.title}
                coverImage={post.content.image}
                date={post.first_published_at || post.published_at}
                author={post.content.author}
              />
              <PostBody md={post.md} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params, preview = null }:GSProps) {
  const data = await getPostAndMorePosts(params.slug, preview)

  console.log(data.post)

  return {
    props: {
      preview,
      post: {
        ...data.post,
        md: data.post?.content?.long_text
          ? data.post.content.long_text
          : null,
      },
      morePosts: data.morePosts,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post:Post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
