import ErrorPage from 'next/error';

import { Box, Divider, Heading, VStack } from '@chakra-ui/react';
import Layout from '@/components/layout';

import { SITE_DESC, SITE_NAME } from '@/lib/constants';
import { Post } from '@/models/contentful/Post';

// issue #106
/*const PostList = dynamic(() => import('@/components/partials/post'));
const BreakpointContainer = dynamic(() => import('@/components/common/breakpoint-container'));
const Pagination = dynamic(() => import('@/components/common/pagenation'));*/
import PostList from '@/components/partials/post';

import Pagination from '@/components/common/pagenation';

interface IndexProps {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  tweetCount: number;
  environment: boolean;
  revalEnv: number;
}

const PostPage = ({ posts, totalCount, currentPage, environment, revalEnv }: IndexProps) => {
  return (
    <>
      {!posts ? (
        <Layout preview={false} meta={{ title: '404 Not found', desc: '' }}>
          <ErrorPage title="ページのデータを取得できませんでした" statusCode={404} />
        </Layout>
      ) : (
        <Layout
          preview={environment}
          meta={{ title: `記事一覧 ${currentPage}ページ目 | ${SITE_NAME}`, desc: SITE_DESC }}
        >
          {posts && (
            <Box mb={10}>
              <VStack spacing={4} mb={8}>
                <Heading as="h1" textStyle="h1">
                  記事一覧 {currentPage}ページ目
                </Heading>
                <Box rounded="lg" my={4} p={3} bg="gray.200">
                  注意: このページは{revalEnv / 60}分ごとにしか更新されません。
                </Box>
                <Divider />
              </VStack>
              {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
              <Pagination totalCount={totalCount} />
            </Box>
          )}
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
  let allPostsForIndex = [];
  let allPostsPublished = [];
  const allPostsForIndexRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPostsByRange?preview=false&skip=${skipAmount}&limit=${PER_PAGE}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );

  if (allPostsForIndexRes.ok) {
    allPostsForIndex = await allPostsForIndexRes.json();
  }
  allPostsPublished = [];
  const allPostsPublishedRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPostsWithSlugOnlySlug?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (allPostsForIndexRes.ok) {
    allPostsPublished = await allPostsPublishedRes.json();
  }

  const revalEnv = parseInt(process.env.REVALIDATE_ARCHIVE ?? '14400');

  return {
    props: {
      posts: allPostsForIndex ?? null,
      totalCount: allPostsPublished.length ?? null,
      currentPage: params.page ?? 1,
      preview: preview ?? null,
      revalEnv: revalEnv,
    },
    revalidate: revalEnv,
  };
}

export const getStaticPaths = async () => {
  let allPostsPublished = [];
  const allPostsPublishedRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPostsWithSlugOnlySlug?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (allPostsPublishedRes.ok) {
    allPostsPublished = await allPostsPublishedRes.json();
  }

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(allPostsPublished.length / PER_PAGE)).map(
    (page) => `/postpage/${page}`,
  );

  return {
    paths,
    fallback: false,
  };
};
