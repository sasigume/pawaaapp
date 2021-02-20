import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { getAuthorsWithSlug, getAllPostsForAuthor, getAuthor } from '../../lib/api'
import { Post } from '../../lib/types'
import { SITE_NAME } from '../../lib/constants'
interface IndexProps {
  authorName?: string;
  allPosts: Post[];
  preview: boolean;
}

const AuthorIndex = ({ authorName, allPosts, preview }: IndexProps) => {
  let heroPost, morePosts
  if (allPosts) {
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
        <Layout preview={preview} title={'Loading... | ' + SITE_NAME} desc={''}><div>Article not found</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${authorName}が書いた記事一覧 | ${SITE_NAME}`)} desc={"Pawaa.app"}>
            <Head>
              <title>{authorName}が書いた記事一覧 | {SITE_NAME}</title>
            </Head>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{allPosts[0] ? `${authorName}が書いた記事一覧` : `${authorName}が書いた記事はありません`}</h1>
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
  const allPosts = (await getAllPostsForAuthor(authorData.uuid, environment)) || []

  return {
    props: {
      authorName: authorData.name,
      preview: environment,
      allPosts: allPosts
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
