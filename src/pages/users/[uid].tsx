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

  return (
    <Layout preview={false} title={user ? (user.name + 'さんのページ') : '(ユーザー詳細ページ)'} desc={"ユーザー詳細ページです"}>

      {user ?
        <div>
          <Container>
            <h1 className="text-3xl font-bold my-4">{user.name}さんのページ</h1>
            <div></div>
          </Container>
        </div>
        : (
          <div>ユーザーが見つかりませんでした。</div>
        )}
    </Layout>
  )
}

