import { NextApiRequest, NextApiResponse } from 'next'
import '@/lib/firebase-admin'
import { firestore } from 'firebase-admin'
import { Answer } from '@/models/Answer'
import { Comment } from '@/models/Comment'

type Data = {
  answer: Answer
  comment: Comment
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const id = req.query.id as string

  const answerDoc = await firestore().collection('answers').doc(id).get()
  const answer = answerDoc.data() as Answer
  answer.id = answerDoc.id

  const commentDoc = await firestore()
    .collection('comments')
    .doc(answer.commentId)
    .get()
  const comment = commentDoc.data() as Comment
  comment.id = commentDoc.id

  res.status(200).json({
    answer,
    comment,
  })
}