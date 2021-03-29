import { SinglePostComponent } from './single-post';
import { PostBase } from '@/models/contentful/Post';
import { Box, Center, Container, Divider, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import { PostForList } from './post-for-list';

interface MultiPostProps {
  posts: PostBase[];
  mode?: string;
}
const MultiPosts = ({ posts, mode }: MultiPostProps) => {
  if (mode == 'archive') {
    const morePosts = posts.slice(1);
    return (
      <section>
        <Center flexDirection="column">
          <Container maxW="container.md">
            <PostForList post={posts[0]} />
          </Container>
          <Divider my={8} borderColor="gray.400" />
          <SimpleGrid maxW="100vw" spacing={4} columns={{ base: 1, lg: 2 }}>
            {morePosts.map((post: PostBase) => (
              <PostForList key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </Center>
      </section>
    );
  } else {
    return (
      <Box>
        {mode == 'more' && (
          <Box textStyle="h2" mb={4}>
            <h2>おすすめ記事</h2>
          </Box>
        )}
        <Center>
          <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }}>
            {posts.map((post) => (
              <PostForList key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    );
  }
};

interface PostListProps {
  posts: PostBase[];
  mode?: string;
}

export const PostList = ({ posts, mode }: PostListProps) => {
  return <MultiPosts mode={mode} posts={posts} />;
};

export default PostList;
