import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { BookComment } from '@/models/firebase/BookComment'

export default async (req: NextApiRequest, res: NextApiResponse<BookComment[]>) => {

  const slug = req.query.slug as string

  function GetArrayOfComments(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) {
    const array = snapshot.docs.map((doc) => {
      const comment = doc.data() as BookComment
      comment.id = doc.id
      return comment
    })
    return array
  }

  function createBaseQuery() {
    return firestore()
      .collection('bookComments')
      .where('bookSlug', '==', slug)
      .orderBy('createdAt', 'desc')
      .limit(10)
  }

  const snapshot = await createBaseQuery().get()

  const bookComments = GetArrayOfComments(snapshot)

  res.status(200).json(bookComments)
}