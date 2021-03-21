import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { User } from '../../models/firebase/User'
import firebase from 'firebase/app'
import Layout from '@/components/partials/layout'
import { Container } from '@chakra-ui/react'
import { BreakpointContainer } from '@/components/common/breakpoint-container'

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
    <>
      {!user ?

        <Layout preview={false} title={'404 Not found'} desc={''}>
          <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
        </Layout>
        : (
          <Layout preview={false} title={user ? (user.name + 'さんのページ') : '(ユーザー詳細ページ)'} desc={"ユーザー詳細ページです"}>

            <Container>
              <BreakpointContainer>
                <h1 className="text-3xl font-bold my-4">{user.name}さんのページ</h1>
              </BreakpointContainer>
            </Container>

          </Layout>
        )
      }
    </>
  )
}

