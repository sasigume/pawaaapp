import Avatar from './avatar'
import Date from './date'
import CoverImageComponent from './cover-image-component'
import Link from 'next/link'
import { HeroPostType } from '../lib/types'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}:HeroPostType) {
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <div className="mb-8 md:mb-16">
        <CoverImageComponent title={title} url={coverImage} slug={slug} />
      </div>
      <div className="flex flex-col">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} src={author.content.picture.filename} />
        </div>
      </div>
    </div>
  )
}
