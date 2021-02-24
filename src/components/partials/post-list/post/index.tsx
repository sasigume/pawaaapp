
import CoverImageComponent from './cover-image-component'
import Link from 'next/link'
import SubjectList from './subject-list'
import CreatorList from './creator-list'
import PostBody from './post-body'
import { Post } from '@/models/contentful/Post'
import dayjs from 'dayjs'
import cn from 'classnames'

interface Props {
  post: Post
  mode: string
}
export default function PostComponent({ post, mode }: Props) {
  return (
    <article>
      <div className={cn('px-6', {
        'border-b-2 border-gray-300 mb-12': mode == "single",
        'text-md': mode !== "single"
      })}>
        <div className="mb-5">
          <CoverImageComponent slug={post.slug} title={post.displayName} url={post.image.url} />
        </div>
        {mode == "single" && (<h2 className="text-3xl font-bold mb-3">
          <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
            <a className="hover:underline">{post.displayName}</a>
          </Link>
        </h2>
        )}
        {mode !== "single" && (<h3 className="text-3xl font-bold mb-3">
          <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
            <a className="hover:underline">{post.displayName}</a>
          </Link>
        </h3>
        )}
        {post.subjectsCollection.items.length > 0 && (<div className="text-sm mb-4">
          <SubjectList subjects={post.subjectsCollection.items} />
        </div>)}
        <div className="text-lg mb-4">
          公開: {dayjs(post.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')} /最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
        {mode == "list" && <p className="text-lg mb-4">{post.intro}</p>}
        {post.creatorsCollection.items.length > 0 && (<div className="text-sm mb-4">
          <CreatorList creators={post.creatorsCollection.items} />
        </div>)}
      </div>
      <div>
        {mode == "single" ? <PostBody md={post.md} /> : ''}
      </div>
    </article>
  )
}
