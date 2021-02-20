import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import Layout from '@/components/partials/layout'
import { Comment } from '../../models/Comment'
import { useAuthentication } from '@/hooks/authentication'
import { toast } from 'react-toastify';
import { Answer } from '../../models/Answer'
import Container from '@/components/common/container'

type Query = {
  id: string
}

export default function CommentsShow() {
  const router = useRouter()
  const query = router.query as Query
  const { user } = useAuthentication()
  const [comment, setComment] = useState<Comment>(null!)
  const [answer, setAnswer] = useState<Answer>(null!)
  const [body, setBody] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function loadData() {
    if (query.id === undefined) {
      return
    }

    const commentDoc = await firebase
      .firestore()
      .collection('comments')
      .doc(query.id)
      .get()
    if (!commentDoc.exists) {
      return
    }

    const gotComment = commentDoc.data() as Comment
    gotComment.id = commentDoc.id
    setComment(gotComment)

    if (!gotComment.isReplied) {
      return
    }

    const answerSnapshot = await firebase
      .firestore()
      .collection('answers')
      .where('commentId', '==', gotComment.id)
      .limit(1)
      .get()
    if (answerSnapshot.empty) {
      return
    }

    const gotAnswer = answerSnapshot.docs[0].data() as Answer
    gotAnswer.id = answerSnapshot.docs[0].id
    setAnswer(gotAnswer)
  }

  useEffect(() => {
    if (user === null) {
      return
    }

    loadData()
  }, [query.id, user])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)

    await firebase.firestore().runTransaction(async (t) => {
      t.set(firebase.firestore().collection('answers').doc(), {
        uid: user.uid,
        commentId: comment.id,
        body,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      t.update(firebase.firestore().collection('comments').doc(comment.id), {
        isReplied: true,
      })
    })

    const now = new Date().getTime()
    setAnswer({
      id: '',
      uid: user.uid,
      questionId: comment.id,
      body,
      createdAt: new firebase.firestore.Timestamp(now / 1000, now % 1000),
    })

    toast.success('😙 送信できました!', {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Layout preview={false} title={comment ? comment.body : 'LOADING'} desc={"コメントです"}>
      <Container>
        <div className="mt-16 mb-12">
          {comment && (
            <>
              <div className="mb-16">
                <div className="p-4 border-2 border-red-400 rounded-xl shadow-xl m-4">{comment.body}</div>
              </div>

              <section className="text-center mt-4">
                <h2 className="my-8 text-3xl">あなたの回答</h2>

                {answer === null ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-red-500 text-white text-3xl font-bold p-16 m-12">公序良俗に反した投稿は即刻削除します。Googleアカウントと投稿が紐づけられていることを忘れないでください。</div>

                    <form onSubmit={onSubmit}>
                      <div className="flex flex-col jusify-center mb-12">
                        <textarea
                          className="w-64 border-2 p-4 mb-4 rounded-xl border-gray-600"
                          placeholder="こうやって解きます。"
                          rows={6}
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          required
                        ></textarea>
                        {isSending ? (
                          <div
                            className="spinner-border text-secondary"
                            role="status"
                          ></div>
                        ) : (
                            <button type="submit" className="p-4 bg-blue-400 text-white font-bold shadow-lg rounded-xl">
                              回答する
                            </button>
                          )}
                      </div>
                    </form>
                  </div>) : (
                    <div className="p-4 border-2 border-green-400 rounded-xl shadow-xl m-4">
                      <div className="card-body text-left">{answer.body}</div>
                    </div>
                  )}
              </section>
            </>
          )}
        </div>
      </Container>
    </Layout>
  )
}