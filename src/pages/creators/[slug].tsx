import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container } from '@chakra-ui/react'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getAllCreatorsWithSlug, getAllPostsForCreator, getCreator } from '@/lib/contentful/graphql'
import { Post } from '@/models/contentful/Post'
import { Creator } from '@/models/contentful/Creator'
interface IndexProps {
  creator?: Creator
  posts: Post[]
  preview: boolean
}

const CreatorIndex = ({ creator, posts, preview }: IndexProps) => {
  const router = useRouter()
  return (
    <>
      {(!creator) ? (<>

        {router.isFallback ? (
          <Layout preview={preview} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>

      ) : (
          <Layout preview={preview} title={(`${creator?.displayName}が書いた記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${creator.displayName}が書いた記事一覧` : `${creator?.displayName}が書いた記事はありません`}</h1>
                  {creator.description && (<div className="my-4">{creator.description}</div>)}
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
  preview: boolean;
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? ''

  let posts: (Post[] | null)
  const creatorData = (await getCreator(slug, preview)) ?? null
  creatorData ? posts = (await getAllPostsForCreator(creatorData.slug, preview)) : posts = []

  return {
    props: {
      creator: creatorData ?? null,
      preview: preview,
      posts: posts ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths({ preview = false }) {
  const allCreators = await getAllCreatorsWithSlug(preview)
  return {
    paths: allCreators?.map((a: any) => `/creators/${a.slug}`) || [],
    fallback: true,
  }
}
