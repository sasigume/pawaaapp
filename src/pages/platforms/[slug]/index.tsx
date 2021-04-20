import ErrorPage from 'next/error';
import PostList from '@/components/partials/post';
import Layout from '@/components/layout';
import {
  getPlatform,
  getAllPostsForPlatform,
  getAllPlatformsWithSlug,
} from '@/lib/contentful/graphql';
import { Post, PostForList } from '@/models/contentful/Post';
import { Platform } from '@/models/contentful/Platform';
import { Box } from '@chakra-ui/react';

interface IndexProps {
  platform: Platform;
  posts: Post[];
  preview: boolean;
}

//const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');
const TOTAL_LIMIT = 11;

const platformIndex = ({ platform, posts, preview }: IndexProps) => {
  return (
    <>
      {!platform ? (
        <>
          <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }}>
            <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
          </Layout>
        </>
      ) : (
        <Layout
          preview={preview}
          meta={{
            title: `${platform.displayName}の記事一覧 最新${posts.length}件`,
            desc: platform.description ?? '説明文がありません。',
          }}
        >
          <Box mb={16}>
            <Box textStyle="h1" mb={8}>
              <h1>
                {posts[0]
                  ? `${platform.displayName}の記事一覧 最新${posts.length}件`
                  : `${platform.displayName}の記事はありません`}
              </h1>
            </Box>
            {platform.description && (
              <Box my={4}>{platform.description ?? '説明文がありません'}</Box>
            )}
            {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
          </Box>
        </Layout>
      )}
    </>
  );
};

export default platformIndex;

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? '';
  let posts: PostForList[];

  const platformData = (await getPlatform(slug, preview)) ?? null;
  platformData
    ? (posts = await getAllPostsForPlatform(platformData.slug, preview, TOTAL_LIMIT))
    : (posts = []);
  return {
    props: {
      platform: platformData ?? null,
      preview: preview,
      posts: posts ?? null,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const allplatforms = (await getAllPlatformsWithSlug(false)) ?? [];
  return {
    paths: allplatforms?.map((platform: Platform) => `/platforms/${platform.slug}`) || [],
    fallback: true,
  };
}
