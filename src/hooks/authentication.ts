import firebase from 'firebase/app'
import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { User } from '../models/User'
import { toast } from 'react-toastify';

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
          email: firebaseUser.email ?? ''
        }
        setUser(loginUser)
        createUserIfNotFound(loginUser)

        toast.success('😙 ログインできました', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // Sign out
        setUser(null!)
      }
    })
  }, []) // Blank array prevent from changing

  return { user }
}