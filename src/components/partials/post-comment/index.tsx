
import {PostComment} from '@/models/PostComment'
import dayjs from 'dayjs'

interface Props {
  c: PostComment
}

export default function CommentComponent({c}:Props) {
  return (
    <div className="my-3 py-6 border-b border-gray-200">
        <div className="grid gap-y-3">
          <div>{c.senderName}さん:</div>
            <div>
            {c.body}
            <div className="text-sm text-right">
              <small>{dayjs(c.createdAt._seconds*1000).format('YYYY/MM/DD HH:mm:ss')}</small>
            </div>
          </div>
        </div>
    </div>
  )
}