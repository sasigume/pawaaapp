import PostComponent from './post'
import { Post } from '@/models/Post'

interface MultiPostProps {
  posts: Post[];
  mode?: string;
}
const MultiPosts = ({ posts, mode }: MultiPostProps) => {
  if (mode == "archive") {
    const morePosts = posts.slice(1)
    return (
      <section>
        <PostComponent
          mode="list"
          key={posts[0].slug}
          slug={posts[0].slug}
          first_published_at={posts[0].first_published_at}
          published_at={posts[0].published_at}
          content={posts[0].content}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
          {morePosts.map((post) => (
            <PostComponent
              mode="list"
              key={post.slug}
              slug={post.slug}
              first_published_at={post.first_published_at}
              published_at={post.published_at}
              content={post.content}
            />
          ))}
        </div>
      </section>
    )
  }
  else {
    return (
      <section>
        {mode == "more" && <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter">他の記事</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
          {posts.map((post) => (
            <PostComponent
              mode="list"
              key={post.slug}
              slug={post.slug}
              first_published_at={post.first_published_at}
              published_at={post.published_at}
              content={post.content}
            />
          ))}
        </div>
      </section>
    )
  }
}

interface PostListProps {
  posts: Post[];
  mode?: string;
}

export const PostList = ({ posts, mode }: PostListProps) => {
  if (mode == "single") {
    return (
      <PostComponent
        mode="single"
        key={posts[0].slug}
        slug={posts[0].slug}
        first_published_at={posts[0].first_published_at}
        published_at={posts[0].published_at}
        content={posts[0].content}
      />
    )
  } else {
    return (
      <MultiPosts mode={mode} posts={posts} />
    )
  }
}

export default PostList
