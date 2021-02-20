import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { useAuthentication } from '@/hooks/authentication'
import { Comment } from '@/models/Comment'
import Layout from '@/components/partials/layout'

export default function CommentsReceived() {
  const { user } = useAuthentication()
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    if (!process.browser) {
      return
    }
    if (user === null) {
      return
    }

    async function loadComments() {
      const snapshot = await firebase
        .firestore()
        .collection('comments')
        .where('receiverUid', '==', user.uid)
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
      <div>{comments.length}</div>
    </Layout>
  )
}