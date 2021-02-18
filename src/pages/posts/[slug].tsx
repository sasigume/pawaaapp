import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/containerComponent'
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
import useStoryblok from "@/lib/storyblok-hook"

interface PostProps {
  post: Post;
  morePosts: Post[];
  preview: boolean;
}

export default function PostPage({ post, morePosts, preview }: PostProps) {

  const story = useStoryblok(post)

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
                    { story ? story.name : '記事タイトルが設定されていません' } | {CMS_NAME}
                  </title>
                  <meta property="og:image" content={post.content.image} />
                </Head>
                {/*<PostHeader
                  title={post.content.title}
                  coverImage={post.content.image}
                  date={post.first_published_at || post.published_at}
                  author={post.content.author}
                />
                <PostBody md={post.md} /> */}
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

export async function getStaticProps({ params, preview = null }: GSProps) {

  const postData = await getPostAndMorePosts(params.slug, preview)

  console.log(postData)

  return {
    props: {
      preview: preview || false,
      post: {
        ...postData.post,
        md: postData.post?.content?.long_text
          ? postData.post.content.long_text
          : null,
      },
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
