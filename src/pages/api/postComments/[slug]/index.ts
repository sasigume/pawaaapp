import { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/app'
import '@/lib/firebase/admin'
import { firestore } from 'firebase-admin'
import { PostComment } from '@/models/PostComment'

export default async (req: NextApiRequest, res: NextApiResponse<PostComment[]>) => {

  const slug = req.query.slug as string

  function GetArrayOfComments(
    snapshot: firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) {
    const array = snapshot.docs.map((doc) => {
      const comment = doc.data() as PostComment
      comment.id = doc.id
      return comment
    })
    return array
  }

  function createBaseQuery() {
    return firestore()
      .collection('postComments')
      .where('postSlug', '==', slug)
      .orderBy('createdAt', 'desc')
      .limit(10)
  }

  const snapshot = await createBaseQuery().get()

  const postComments = GetArrayOfComments(snapshot)

  res.status(200).json(postComments)
}