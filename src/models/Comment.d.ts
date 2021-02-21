import firebase from 'firebase/app'

export interface Comment {
  id: string
  senderUid: string
  receiverUid: string
  body: string
  isReplied: boolean
  createdAt: firebase.firestore.Timestamp
}