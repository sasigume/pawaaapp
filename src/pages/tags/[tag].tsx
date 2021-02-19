import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { getTagPostsWithSlug, getAllPostsForTag } from '../../lib/api'
import { Post } from '../../lib/types'
import { CMS_NAME } from '../../lib/constants'
interface IndexProps {
  tag?: string;
  allPosts: Post[];
  preview: boolean;
}

const TagIndex = ({ tag, allPosts, preview }: IndexProps) => {
  let heroPost,morePosts
  if(allPosts){
    heroPost = allPosts[0]
    morePosts = allPosts.slice(1)
  }

  const router = useRouter()
  if (!router.isFallback && !allPosts) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {router.isFallback ? (
        <Layout preview={preview} title={'Loading... | ' + CMS_NAME} desc={''}><div>Tag not found</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${tag}タグの記事一覧 | ${CMS_NAME}`)} desc={"Pawaa.app"}>
            <Head>
              <title>{tag}タグの記事一覧 | {CMS_NAME}</title>
            </Head>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{allPosts[0] ? `${tag}タグの記事一覧` : `${tag}タグがついた記事はありません`}</h1>
                </div>
                {heroPost && (
                  <HeroPost
                    title={heroPost.content.title}
                    coverImage={heroPost.content.image}
                    date={heroPost.first_published_at || heroPost.published_at}
                    author={heroPost.content.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.content.intro}
                    tag_list={heroPost.tag_list ?? []}
                  />
                )}
                {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
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

  const allPosts = (await getAllPostsForTag(tag, environment)) || []
  return {
    props: {
      tag: tag,
      preview: environment,
      allPosts: allPosts
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const allTags = await getTagPostsWithSlug()
  console.log('Found tags: ', allTags)
  return {
    paths: allTags?.map((t: any) => `/tags/${t.name}`) || [],
    fallback: true,
  }
}
