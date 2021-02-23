import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getCreatorsWithSlug, getAllPostsForCreator, getCreator } from '@/lib/storyblok/api'
import { Post } from '@/models/Post'
import { SITE_NAME } from '@/lib/constants'
interface IndexProps {
  creatorName?: string;
  posts: Post[];
  preview: boolean;
}

const CreatorIndex = ({ creatorName, posts, preview }: IndexProps) => {

  const router = useRouter()
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {(router.isFallback) ? (
        <Layout preview={preview} title={'Loading... | ' + SITE_NAME} desc={''}><div>当てはまる記事がありません。</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${creatorName}が書いた記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${creatorName}が書いた記事一覧` : `${creatorName}が書いた記事はありません`}</h1>
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

export default CreatorIndex

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {
  const slug = params.slug ?? ''
  let environment
  process.env.NODE_ENV == "development" ? environment = true : environment = false

  const creatorData = (await getCreator(slug,environment)) || ''
  const posts = (await getAllPostsForCreator(creatorData.uuid, environment)) || []

  return {
    props: {
      creatorName: creatorData.content.displayName,
      preview: environment,
      posts: posts
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allCreators = await getCreatorsWithSlug()
  return {
    paths: allCreators?.map((a: any) => `/creators/${a.slug}`) || [],
    fallback: true,
  }
}
