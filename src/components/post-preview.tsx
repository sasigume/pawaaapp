import Avatar from './avatar'
import Date from './date'
import CoverImageComponent from './cover-image-component'
import Link from 'next/link'
import TagList from '../components/tag-list'

import { HeroPostType } from '../lib/types'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tag_list
}: HeroPostType) {
  return (
    <div>
      <div className="mb-5">
        <CoverImageComponent slug={slug} title={title} url={coverImage} />
      </div>
      <h3 className="text-3xl mb-3">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <TagList tags={tag_list ?? []} />
      </div>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg mb-4">{excerpt}</p>
      <Avatar name={author.name} src={author.content.picture.filename} />
    </div>
  )
}
