import firebase from 'firebase/app'

export interface Answer {
  id: string
  uid: string
  commentId: string
  body: string
  createdAt: firebase.firestore.Timestamp
}