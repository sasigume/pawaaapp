import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '@/models/User'

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
          name: firebaseUser.displayName ?? '名前を設定していません',
          email: firebaseUser.email ?? '',
          photoUrl: firebaseUser.providerData[0]?.photoURL ?? '/public/android-chrome-192x192.png'
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)

        console.log('Login: ' + loginUser.uid)
      } else {
        console.log('Setuser:null')
        setUser(null!)
      }
    })
  }, []) // Blank array prevent from changing

  return { user }
}