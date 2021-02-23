import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../../models/User'
import firebase from 'firebase/app'
import Layout from '@/components/partials/layout'
import Container from '@/components/common/container'
import { toast } from 'react-toastify';
import { useAuthentication } from '@/hooks/authentication'
import Warning from '@/components/common/warning'

interface Query {
  uid?: string
}

export default function UserShow() {
  const [user, setUser] = useState<User>(null!)
  const [body, setBody] = useState('')
  const [didYouSend, setSended] = useState(false)

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
        console.log('ユーザーが見つかりませんでした')
        return
      }

      const gotUser = doc.data() as User

      gotUser.uid = doc.id
      setUser(gotUser)
    }

    loadUser()
    // execute when uid in URL is changed
  }, [query.uid])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // prevent duplicated post
    setSended(true)

    console.log('Sending to ' + user.uid)

    await firebase.firestore().collection('comments').add({
      senderUid: firebase.auth().currentUser?.uid,
      receiverUid: user?.uid,
      body,
      isReplied: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
  const currentUser = useAuthentication().user

  if(!currentUser) {
    return <div>ログインしてください。</div>
  }

  return (
    <Layout preview={false} title={user ? (user.name + 'さんのページ') : '(ユーザー詳細ページ)'} desc={"ユーザー詳細ページです"}>
      {(user && currentUser) ?
        <div>
          {user.uid != currentUser.uid ? (
            <Container>
              <h1 className="text-3xl font-bold my-4">{user.name}さんのページ</h1>
              <div className="my-5">{user.name}さんに質問を送れます。</div>

              <div className="flex flex-col items-center">
                <Warning />
                <form onSubmit={onSubmit}>

                  <div className="flex flex-col jusify-center mb-12">
                    <textarea
                      className="w-64 border-2 p-4 mb-4 rounded-xl border-gray-600"
                      placeholder="どうやって解くの？"
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
                          質問を送信する
                        </button>
                      )}
                  </div>
                </form>
              </div>
            </Container>
          ) : (
              <Container>
                <div className="flex flex-col py-16 justify-center text-center">
                  <a className="block bg-blue-400 text-white text-4xl shadow-xl font-bold rounded-xl p-4" target="_blank" href={(`https://twitter.com/intent/tweet?text=質問してね！%0A%0A${process.env.HTTPS_URL}/users/${user.uid}`)} data-show-count="false">Tweet</a>

                  <div className="my-16">自分に質問はできません。</div>
                </div>
              </Container>
            )}
        </div>
      :(
        <div>ユーザーが見つかりませんでした。</div>
      )}
    </Layout>
  )
}

