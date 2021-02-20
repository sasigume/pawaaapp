import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '../../models/User'
import firebase from 'firebase/app'

interface Query {
  uid?: string
}

export default function UserShow() {
  const [user, setUser] = useState<User>()
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

  return <div>{user ? user.name : 'LOADING...'}</div>
}