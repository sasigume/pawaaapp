import { useEffect, useState, useRef } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '@/hooks/authentication'
import { Comment } from '@/models/Comment'
import Layout from '@/components/partials/layout'
import dayjs from 'dayjs'
import Container from '@/components/common/container'
import Link from 'next/link'

export default function CommentsReceived() {
  const { user } = useAuthentication()
  const [comments, setComments] = useState<Comment[]>([])

  // detect if user scrolled to end
  const [isPaginationFinished, setIsPaginationFinished] = useState(false)
  const scrollContainerRef = useRef(null)

  function onScroll() {
    if (isPaginationFinished) {
      return
    }

    const container: any = scrollContainerRef.current
    if (container === null) {
      return
    }

    const rect = container.getBoundingClientRect()

    if (rect.top + rect.height > window.innerHeight) {
      return
    }

    loadNextComments()
  }

  // detect scrolling
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
    // scrollContainerRef is null unless DOM is rendered
  }, [comments, scrollContainerRef.current, isPaginationFinished])

  function createBaseQuery() {
    return firebase
      .firestore()
      .collection('comments')
      .where('receiverUid', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .limit(10)
  }

  function appendComments(
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) {
    const gotComments = snapshot.docs.map((doc) => {
      const comment = doc.data() as Comment
      comment.id = doc.id
      return comment
    })
    setComments(comments.concat(gotComments))
  }

  async function loadComments() {
    const snapshot = await createBaseQuery().get()

    if (snapshot.empty) {
      setIsPaginationFinished(true)
      return
    }

    appendComments(snapshot)
  }

  async function loadNextComments() {
    if (comments.length === 0) {
      console.log('All comments loaded!')
      return
    }

    const lastComment = comments[comments.length - 1]
    const snapshot = await createBaseQuery()
      .startAfter(lastComment.createdAt)
      .get()

    if (snapshot.empty) {
      return
    }

    appendComments(snapshot)
  }

  useEffect(() => {
    if (!process.browser) {
      return
    }
    if (user === null) {
      return
    }

    loadComments()
  }, [process.browser, user])

  return (
    <Layout preview={false} title={user ? (user.name + 'さんの受け取ったコメント') : 'LOADING'} desc={"受け取ったコメントの一覧です"}>
      <Container><h1 className="text-4xl my-10">受け取った質問一覧</h1>

        <div className="min-h-screen">
          <div className="" ref={scrollContainerRef}>
            {comments.map((c: Comment) => (
              <Link href={(`/comments/${c.id}`)} key={c.id}>
                <a>
                  <div className="my-3">
                    <div className="w-full">
                      <div className="m-3 border-2 p-2 overflow-ellipsis truncate">
                        {c.body}
                        <div className="text-sm text-right">
                          <small>{dayjs(c.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}