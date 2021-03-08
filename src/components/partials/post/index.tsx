import { SinglePostComponent } from './single-post'
import { Post } from '@/models/contentful/Post'
import { Box, Center, Container, Divider, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import { PostForList } from './post-for-list'

interface MultiPostProps {
  posts: Post[];
  mode?: string;
}
const MultiPosts = ({ posts, mode }: MultiPostProps) => {
  if (mode == "archive") {
    const morePosts = posts.slice(1)
    return (
      <section>
        <Center flexDirection="column">
          <Container maxW="container.md">
            <PostForList
              post={posts[0]}
            />
          </Container>
          <Divider my={8} borderColor="gray.400" />
          <SimpleGrid spacing={4} columns={{ base: 1, lg: 2 }}>
            {morePosts.map((post: Post) => (
              <PostForList
                key={post.slug}
                post={post}
              />
            ))}
          </SimpleGrid>
        </Center>
      </section>
    )
  }
  else {
    return (
      <Box>
        {mode == "more" && (<Box textStyle="h2" mb={4}>
          <h2>他の記事</h2>
        </Box>)}
        <Center>
          <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }}>
            {posts.map((post) => (
              <PostForList
                key={post.slug}
                post={post}
              />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    )
  }
}

interface PostListProps {
  posts: Post[];
  mode?: string;
  expand?: boolean;
}

export const PostList = ({ posts, mode }: PostListProps) => {
  if (mode == "single") {
    return (
      <SinglePostComponent
        post={posts[0]}
      />
    )
  } else {
    return (
      <MultiPosts mode={mode} posts={posts} />
    )
  }
}

export default PostList
