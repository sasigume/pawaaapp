import PostPreview from './post-preview'
import { Post } from '@/lib/types'
interface Props { posts: Post[] }
export default function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        他の記事
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.content.title}
            coverImage={post.content.image}
            date={post.first_published_at || post.published_at}
            author={post.content.author}
            slug={post.slug}
            excerpt={post.content.intro}
          />
        ))}
      </div>
    </section>
  )
}
