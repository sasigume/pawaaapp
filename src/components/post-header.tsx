import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImageComponent from './cover-image-component'
import { Post } from '../lib/types'
import TagList from '../components/tag-list'

export default function PostHeader({ slug, published_at, first_published_at, content ,tag_list}: Post) {
  return (
    <>
    <div className="sm:mx-0">
        <CoverImageComponent title={content.title} slug={slug} url={content.image} />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold my-10">{content.title}</h1>      
      <div className="">
        <div className="block mb-4">
          <Avatar slug={content.author.slug} name={content.author.name} src={content.author.content.picture.filename} />
        </div>
        <div className="mb-6">
          <div>投稿 <Date dateString={first_published_at} /></div>
          <div>最終更新 <Date dateString={published_at} /></div>
        </div>
        <TagList tags={tag_list ?? []} />
      </div>
    </>
  )
}
