import AdsenseBox from '@/components/common/adsense-box';
import { PostForList } from '@/models/contentful/Post';
import { Box, Center, Container, Divider, SimpleGrid, Stack } from '@chakra-ui/react';
import { CompactPost } from './compact-post';

interface MultiPostProps {
  posts: PostForList[];
  mode?: 'archive' | 'more' | 'drawer' | undefined;
}
const MultiPosts = ({ posts, mode }: MultiPostProps) => {
  if (mode == 'archive') {
    const morePosts = posts.slice(1);
    return (
      <section>
        <Center flexDirection="column">
          <Container maxW="container.md">
            <CompactPost post={posts[0]} />
          </Container>
          <Divider my={8} borderColor="gray.400" />
          <SimpleGrid maxW="100vw" spacing={4} columns={{ base: 1, lg: 2 }}>
            {morePosts.map((post: PostForList) => (
              <CompactPost mode={mode} key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </Center>
      </section>
    );
  }
  if (mode == 'drawer') {
    return (
      <Stack>
        <Box textStyle="h4" mb={4}>
          <h2>おすすめ記事</h2>
        </Box>
        {posts.map((post) => (
          <CompactPost mode={mode} key={post.slug} post={post} />
        ))}
      </Stack>
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
              <CompactPost mode={mode} key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    );
  }
};

interface PostListProps {
  posts: PostForList[];
  mode?: 'archive' | 'more' | 'drawer' | undefined;
  enableAd?: boolean;
}

export const PostList = ({ posts, mode, enableAd }: PostListProps) => {
  return (
    <>
      <MultiPosts mode={mode} posts={posts} />
      {enableAd !== false && <AdsenseBox layout="responsive" slot={'9194360322'} />}
    </>
  );
};

export default PostList;
