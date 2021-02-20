import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../../models/User'
import firebase from 'firebase/app'
import Layout from '@/components/partials/layout'
import Container from '@/components/common/container'
import { toast } from 'react-toastify';

interface Query {
  uid?: string
}

export default function UserShow() {
  const [user, setUser] = useState<User>(null!)
  const [body, setBody] = useState('')
  const [isSending, setIsSending] = useState(false)

  const router = useRouter()
  const query = router.query as Query

  useEffect(() => {
    if (query.uid === undefined) {
      return
    }
    async function loadUser() {
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get()

      if (!doc.exists) {
        console.log('returned')
        return
      }

      const gotUser = doc.data() as User
      gotUser.uid = doc.id
      setUser(gotUser)
    }

    loadUser()
  }, [query.uid])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // prevent duplicated post
    setIsSending(true)

    console.log('Sending to ' + user.uid)

    await firebase.firestore().collection('comments').add({
      senderUid: firebase.auth().currentUser?.uid,
      receiverUid: user?.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // end submit action
    setIsSending(false)

    setBody('')
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
    <Layout preview={false} title={user ? (user.name + 'さんのページ') : 'LOADING'} desc={"ユーザー詳細ページです"}>
      <div>
        {user && (
          <Container>
            <h1 className="text-3xl font-bold my-4">{user.name}さんのページ</h1>
            <div className="my-5">{user.name}さんに質問を送れます。</div>

            <div className="flex flex-col items-center">
              <div className="bg-red-500 text-white text-3xl font-bold p-16 m-12">公序良俗に反した投稿は即刻削除します。Googleアカウントと投稿が紐づけられていることを忘れないでください。</div>
              <form onSubmit={onSubmit}>

                <div className="flex flex-col jusify-center mb-12">
                  <textarea
                    className="w-64 border-2 p-4 mb-4 rounded-xl border-gray-600"
                    placeholder="どうやって解くの？"
                    rows={6}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  ></textarea>
                  {isSending ? (
                    <span className="" role="status">
                      (送信中)
                    </span>
                  ) : (
                      <button type="submit" className="p-4 bg-blue-400 text-white font-bold shadow-lg rounded-xl">
                        質問を送信する
                      </button>
                    )}
                </div>
              </form>
            </div>
          </Container>
        )}
      </div>
    </Layout>
  )
}

