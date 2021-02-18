import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImageComponent from './cover-image-component'
import PostTitle from '../components/post-title'

import { PostHeaderType } from '@/lib/types'

export default function PostHeader({ title, coverImage, date, author }:PostHeaderType) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
      <Avatar name={author.name} src={author.content.picture.filename} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImageComponent title={title} slug={title} url={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
        <Avatar name={author.name} src={author.content.picture.filename} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
