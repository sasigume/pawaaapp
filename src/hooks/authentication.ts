import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '@/models/firebase/User'

const userState = atom<User>({
  key: 'user',
  default: null!,
})

async function createUserIfNotFound(user: User) {
  const userRef = firebase.firestore().collection('users').doc(user.uid)
  const doc = await userRef.get()
  if (doc.exists) {
    return
  }
}

export function useAuthentication() {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user !== null) {
      return
    }

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: firebaseUser.providerData[0]?.displayName ?? '名前を設定していません',
          email: firebaseUser.email ?? '',
          photoUrl: firebaseUser.providerData[0]?.photoURL ?? '/public/android-chrome-192x192.png',
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)

      } else {
        setUser(null!)
      }
    })
  }, []) // Blank array prevent from changing

  return { user }
}