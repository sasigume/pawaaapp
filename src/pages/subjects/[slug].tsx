import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getSubject, getSubjectsWithSlug, getAllPostsForSubject } from '@/lib/storyblok/subject'
import { Post } from '@/models/Post'
import { SITE_NAME } from '@/lib/constants'
interface IndexProps {
  subjectName?: string;
  posts: Post[];
  preview: boolean;
}

const SubjectIndex = ({ subjectName, posts, preview }: IndexProps) => {

  const router = useRouter()
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {(router.isFallback) ? (
        <Layout preview={preview} title={'Loading... | ' + SITE_NAME} desc={''}><div>Article not found</div></Layout>
      ) : (
          <Layout preview={preview} title={(`${subjectName}の記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${subjectName}の記事一覧` : `${subjectName}の記事はありません`}</h1>
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

export default SubjectIndex

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {
  const slug = params.slug ?? ''
  let environment
  process.env.NODE_ENV == "development" ? environment = true : environment = false

  const subjectData = (await getSubject(slug,environment)) || ''
  console.log(subjectData.uuid)
  const posts = (await getAllPostsForSubject(subjectData.uuid, environment)) || []

  return {
    props: {
      subjectName: subjectData.content.displayName,
      preview: environment,
      posts: posts
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const allSubjects = await getSubjectsWithSlug()
  console.log('Found auhtos: ', allSubjects)
  return {
    paths: allSubjects?.map((a: any) => `/subjects/${a.slug}`) || [],
    fallback: true,
  }
}
