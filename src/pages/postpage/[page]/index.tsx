import dynamic from 'next/dynamic';
import ErrorPage from 'next/error';

import { Box, Divider, VStack } from '@chakra-ui/react';
import Layout from '@/components/partials/layout';
import { getAllPostsByRange, getAllPostsWithSlugOnlySlug } from '@/lib/contentful/graphql';

import { SITE_DESC, SITE_NAME } from '@/lib/constants';
import { Post } from '@/models/contentful/Post';

// issue #106
/*const PostList = dynamic(() => import('@/components/partials/post'));
const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const Pagination = dynamic(() => import('@/components/common/pagenation'));*/
import PostList from '@/components/partials/post';
import BreakpointContainer from '@/components/common/breakpoint-container';
import Pagination from '@/components/common/pagenation';

interface IndexProps {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  tweetCount: number;
  environment: boolean;
}

const PostPage = ({ posts, totalCount, currentPage, environment, tweetCount }: IndexProps) => {
  return (
    <>
      {!posts ? (
        <Layout preview={false} meta={{ title: '404 Not found', desc: '' }}>
          <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
        </Layout>
      ) : (
        <Layout
          preview={environment}
          meta={{ title: `${currentPage}ページ目 | ${SITE_NAME}`, desc: SITE_DESC }}
        >
          <BreakpointContainer>
            {posts && (
              <Box mb={10}>
                <VStack textStyle="h1" spacing={4} mb={8}>
                  <h1>{currentPage}ページ目</h1>
                  <Divider />
                </VStack>
                {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
                <Pagination totalCount={totalCount} />
              </Box>
            )}
          </BreakpointContainer>
        </Layout>
      )}
    </>
  );
};

export default PostPage;

interface GSProps {
  preview: boolean;
  params: any;
}

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');
const PER_PAGE = parseInt(process.env.PAGINATION ?? '10');

export async function getStaticProps({ preview = false, params }: GSProps) {
  const skipAmount = (params.page - 1) * PER_PAGE;

  const allPostsForIndex = (await getAllPostsByRange(false, skipAmount, PER_PAGE)) || [];
  const allPostsPublished = (await getAllPostsWithSlugOnlySlug(false, TOTAL_LIMIT)) || [];

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800');

  return {
    props: {
      posts: allPostsForIndex ?? null,
      totalCount: allPostsPublished.length ?? null,
      currentPage: params.page ?? 1,
      preview: preview ?? null,
    },
    revalidate: revalEnv,
  };
}

export const getStaticPaths = async () => {
  const allPostJson = await getAllPostsWithSlugOnlySlug(false, 600);

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(allPostJson.length / PER_PAGE)).map(
    (repo) => `/postpage/${repo}`,
  );

  return {
    paths,
    fallback: false,
  };
};
