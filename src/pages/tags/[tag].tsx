import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getTagsWithSlug, getAllPostsForTag } from '@/lib/api'
import { Post } from '@/lib/types'
import { SITE_NAME } from '@/lib/constants'
interface IndexProps {
  tag?: string;
  posts: Post[];
  preview: boolean;
}

const TagIndex = ({ tag, posts, preview }: IndexProps) => {
  const router = useRouter()
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {router.isFallback ? (
        <Layout preview={preview} title={'Loading... | ' + SITE_NAME} desc={''}><div>Tag not found</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${tag}タグの記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${tag}タグの記事一覧` : `${tag}タグがついた記事はありません`}</h1>
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

export default TagIndex

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {
  const tag = params.tag ?? ''
  let environment
  process.env.NODE_ENV == "development" ? environment = true : environment = false

  const posts = (await getAllPostsForTag(tag, environment)) || []
  return {
    props: {
      tag: tag,
      preview: environment,
      posts: posts
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const allTags = await getTagsWithSlug()
  console.log('Found tags: ', allTags)
  return {
    paths: allTags?.map((t: any) => `/tags/${t.name}`) || [],
    fallback: true,
  }
}
