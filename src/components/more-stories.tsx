import PostPreview from './post-preview'
import { Post } from '../lib/types'
interface Props { posts: Post[] }
export default function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter">
        他の記事
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.content.title}
            coverImage={post.content.image}
            date={post.first_published_at || post.published_at}
            author={post.content.author}
            slug={post.slug}
            excerpt={post.content.intro}
            tag_list={post.tag_list ?? []}
          />
        ))}
      </div>
    </section>
  )
}
