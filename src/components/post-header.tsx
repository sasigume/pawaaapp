import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImageComponent from './cover-image-component'
import { Post } from '@/lib/types'

export default function PostHeader({ slug, published_at, first_published_at, content }: Post) {
  return (
    <>
    <div className="sm:mx-0">
        <CoverImageComponent title={content.title} slug={slug} url={content.image} />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold my-10">{content.title}</h1>
      <div className="hidden md:block md:mb-12">
        <Avatar name={content.author.name} src={content.author.content.picture.filename} />
      </div>
      
      <div className="text-center">
        <div className="block md:hidden mb-3">
          <Avatar name={content.author.name} src={content.author.content.picture.filename} />
        </div>
        <div className="flex flex-col md:flex-row justify-around mb-3 text-lg">
          <div>投稿 <Date dateString={first_published_at} /></div>
          <div>最終更新 <Date dateString={published_at} /></div>
        </div>
      </div>
    </>
  )
}
