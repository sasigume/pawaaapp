import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImageComponent from './cover-image-component'
import { Post } from '@/lib/types'

export default function PostHeader({slug,published_at,first_published_at,content}: Post) {
  return (
    <>
      <h1>{slug}</h1>
      <div className="hidden md:block md:mb-12">
        <Avatar name={content.author.name} src={content.author.content.picture.filename} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImageComponent title={content.title} slug={slug} url={content.image} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={content.author.name} src={content.author.content.picture.filename} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={first_published_at} /> / <Date dateString={published_at} />
        </div>
  </div>
    </>
  )
}
