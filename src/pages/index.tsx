import ErrorPage from 'next/error';
import { Box, Button, Divider, VStack } from '@chakra-ui/react';
import { getAllPostsByRange, getSeries } from '../lib/contentful/graphql';
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/lib/constants';
import { Post } from '@/models/contentful/Post';

import Layout from '@/components/layout';

import PostList from '@/components/partials/post';
import LinkChakra from '@/components/common/link-chakra';

interface IndexProps {
  posts: Post[];
  tweetCount: number;
  environment: boolean;
}

const Index = ({ posts, environment }: IndexProps) => {
  return (
    <>
      {!posts ? (
        <Layout preview={false} meta={{ title: '404 Not found', desc: '' }}>
          <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
        </Layout>
      ) : (
        <Layout preview={environment} meta={{ title: SITE_NAME, desc: SITE_DESC }}>
          {posts && (
            <Box mt={6} mb={10}>
              <VStack textStyle="h1" spacing={4} mb={8}>
                <h2>最近更新された記事</h2>
                <Divider />
              </VStack>
              {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
              <Button mt={6} w="full" as={LinkChakra} href="/postpage/1/">
                記事一覧へ
              </Button>
            </Box>
          )}
        </Layout>
      )}
    </>
  );
};

export default Index;

const PER_PAGE = parseInt(process.env.PAGINATION ?? '10');

export async function getStaticProps({ preview = false }) {
  const searchWord = SITE_URL;

  const tweets = await fetch(
    process.env.API_URL +
      '/twitter?word=' +
      encodeURIComponent(searchWord) +
      '&secret=' +
      process.env.TWITTER_SECRET,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  const tweetsJson = await tweets.json();
  let tweetCount;
  tweetsJson.meta ? (tweetCount = tweetsJson.meta.result_count) : (tweetCount = null);

  const drawerPosts = (await getSeries('popular')) ?? null;

  const allPostsForIndex = (await getAllPostsByRange(false, 0, PER_PAGE)) || [];

  const revalEnv = parseInt(process.env.REVALIDATE_HOME ?? '1200');

  return {
    props: {
      posts: allPostsForIndex ?? null,
      tweetCount: tweetCount ?? null,
      preview: preview ?? null,
    },
    revalidate: revalEnv,
  };
}
