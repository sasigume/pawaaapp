import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../../models/User'
import firebase from 'firebase/app'
import Layout from '@/components/partials/layout'
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
          <div className="text-center">
            <h1 className="h4">{user.name}さんのページ</h1>
            <div className="m-5">{user.name}({user.uid})さんに質問しよう！</div>

            <div className="flex flex-col justify-center mb-3">
              <div className="">
                <form onSubmit={onSubmit}>
                  <textarea
                    className=""
                    placeholder="おげんきですか？"
                    rows={6}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  ></textarea>
                  <div className="m-3">
                    {isSending ? (
                      <div className="" role="status">
                        (送信中)
                        <span className="invisible">Loading...</span>
                      </div>
                    ) : (
                        <button type="submit" className="">
                          質問を送信する
                        </button>
                      )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

