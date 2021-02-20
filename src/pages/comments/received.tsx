import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '@/hooks/authentication'
import { Comment } from '@/models/Comment'
import Layout from '@/components/partials/layout'
import dayjs from 'dayjs'

export default function CommentsReceived() {
  const { user } = useAuthentication()
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    if (!process.browser) {
      return
    }
    if (user == null) {
      return
    }

    async function loadComments() {
      const snapshot = await firebase
        .firestore()
        .collection('comments')
        .where('receiverUid', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty) {
        return
      }

      const gotComments = snapshot.docs.map((doc) => {
        const comment = doc.data() as Comment
        comment.id = doc.id
        return comment
      })
      setComments(gotComments)
    }

    loadComments()
  }, [process.browser, user])

  return (
    <Layout preview={false} title={user ? (user.name + 'さんの受け取ったコメント') : 'LOADING'} desc={"受け取ったコメントの一覧です"}>
      <h1 className="h4">受け取った質問一覧</h1>

      <div className="flex flex-col justify-center">
        <div className="">
          {comments.map((c: Comment) => (
            <div className="my-3" key={c.id}>
              <div className="w-64">
                <div className="m-3 border-2 p-2 overflow-ellipsis truncate">
                  {c.body}
                  <div className="text-sm text-right">
                    <small>{dayjs(c.createdAt.toDate()).format('YYYY/MM/DD HH:mm')}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}