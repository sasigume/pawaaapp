  
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/containercomponent'
import PostBody from '@/components/post-body'
import PostHeader from '@/components/post-header'
import MoreStories from '@/components/more-stories'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { Post } from '@/lib/types'

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
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
            <>
              <article>
                <Head>
                  <title>
                    {post ? post.content.title : '記事タイトルが設定されていません'} | {CMS_NAME}
                  </title>
                  <meta property="og:image" content={''} />
                </Head>
                {/*<PostHeader
                  title={post.name}
                  image={post.image}
                  long_text={post.long_text}
                  created_at={post.created_at}
                  author={post.author}
                  intro={post.intro}
                  slug={post.slug}
                />
                <PostBody md={post.long_text} /> */}
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
