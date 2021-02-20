import firebase from 'firebase/app'

export interface Answer {
  id: string
  uid: string
  questionId: string
  body: string
  createdAt: firebase.firestore.Timestamp
}