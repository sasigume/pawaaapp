import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import ErrorPage from 'next/error'
import { toast } from 'react-toastify';
import Warning from '@/components/common/warning'
import { getAllPostsWithSlug, getPostsForSinglePage } from '@/lib/storyblok/api'
import { Post } from '@/models/Post'
import { PostComment } from '@/models/PostComment'
import Container from '../../../components/common/container'
import Layout from '@/components/partials/layout'
import PostList from '@/components/partials/post-list'
import SectionSeparator from '@/components/common/section-separator'
import PostCommentComponent from '@/components/partials/post-comment/'

interface PostPageProps {
  firstPost: Post;
  morePosts: Post[];
  //postComments: PostComment[];
  preview: boolean;
}


export default function PostPage({ firstPost, morePosts, /*postComments, */ preview }: PostPageProps) {

  const [body, setBody] = useState('')
  const [didYouSend, setSended] = useState(false)

  const router = useRouter()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // prevent duplicated post
    setSended(true)

    await firebase.firestore().collection('postComments').add({
      senderUid: firebase.auth().currentUser?.uid,
      senderName: firebase.auth().currentUser?.displayName,
      postSlug: firstPost.slug,
      body,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date())
    })

    setBody('')
    toast.success('😙 送信できました! 連投はやめてね', {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  if (!router.isFallback && !firstPost) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {(!firstPost) ? (
        <Layout preview={preview} title={'LOADING'} desc={''}><div>Loading…</div></Layout>
      ) : (
          <Layout preview={preview} title={firstPost.content.title} desc={firstPost.content.intro ?? ''}>
            <div className="mt-6">
              <Container>
                {firstPost && <PostList mode="single" posts={[firstPost]} />}
                <SectionSeparator />

                <h2 className="text-3xl font-bold mt-8">コメント</h2>

                {/*{(postComments && postComments.length > 0) ? postComments.map(
                  (c: PostComment) => <PostCommentComponent c={c} key={c.id} />
                ) : (
                    <div>コメントはありません。</div>
                  )}

                <div className="flex flex-col items-center">

                  <Warning />
                  <form onSubmit={onSubmit}>

                    <div className="flex flex-col jusify-center mb-12">
                      <textarea
                        className="w-64 border-2 p-4 mb-4 rounded-xl border-gray-600"
                        placeholder="コメントを書いてね"
                        rows={6}
                        onChange={(e) => setBody(e.target.value)}
                        required
                      ></textarea>
                      {didYouSend ? (
                        <span className="" role="status">
                          (送信できました)
                        </span>
                      ) : (
                          <button type="submit" className="p-4 bg-blue-400 text-white font-bold shadow-lg rounded-xl">
                            コメントする
                          </button>
                        )}
                    </div>
                  </form>
                      </div>*/}


                {morePosts && morePosts.length > 0 && <PostList mode="more" posts={morePosts} />}
              </Container>
            </div>
          </Layout>
        )
      }
    </>)
}

interface GSProps {
  params: any;
  preview: any;
}

export async function getStaticProps({ params }: GSProps) {

  let environment: boolean
  process.env.NODE_ENV == "development" ? environment = true : environment = false
  const posts = await getPostsForSinglePage(params.slug, environment)

  //const commentsRes = await fetch(process.env.HTTPS_URL + `/api/postComments/${params.slug}`)
  //const postComments = await commentsRes.json()

  return {
    props: {
      preview: environment,
      firstPost: posts.firstPost,
      morePosts: posts.morePosts,
      //postComments: postComments
    },
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post: Post) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
