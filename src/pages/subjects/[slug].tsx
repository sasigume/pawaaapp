import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/common/container'
import PostList from '@/components/partials/post-list'
import Layout from '@/components/partials/layout'
import { getSubject, getAllSubjectsWithSlug, getAllPostsForSubject } from '@/lib/contentful/graphql'
import { Post } from '@/models/contentful/Post'
import { Subject } from '@/models/contentful/Subject'
interface IndexProps {
  subject: Subject;
  posts: Post[];
  preview: boolean;
}

const SubjectIndex = ({ subject, posts, preview }: IndexProps) => {

  const router = useRouter()
  return (
    <>
      {(!subject) ? (<>

        {router.isFallback ? (
          <Layout preview={preview} title={'Loading...'} desc={''}><div>読み込み中です。</div></Layout>
        ) : (
            (<Layout preview={preview} title={'404 Not found'} desc={''}>
              <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
            </Layout>)
          )}
      </>) : (
          <Layout preview={preview} title={(`${subject.displayName}の記事一覧`)} desc={"Pawaa.app"}>
            <div>
              <Container>
                <div>
                  <h1 className="text-2xl font-bold my-10">{posts[0] ? `${subject.displayName}の記事一覧` : `${subject.displayName}の記事はありません`}</h1>
                  {subject.description && (<div className="my-4">{subject.description}</div>)}
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
  params: any
  preview: boolean
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? ''
  let posts: Post[]
  const subjectData = await getSubject(slug, preview) ?? null
  subjectData ? posts = await getAllPostsForSubject(subjectData.slug, preview) : posts = []
  return {
    props: {
      subject: subjectData ?? null,
      preview: preview,
      posts: posts ?? null
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allSubjects = await getAllSubjectsWithSlug()
  return {
    paths: allSubjects?.map((a: any) => `/subjects/${a.slug}`) || [],
    fallback: true,
  }
}
