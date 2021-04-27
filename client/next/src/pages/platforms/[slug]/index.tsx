import ErrorPage from 'next/error';
import PostList from '@/components/partials/post';
import Layout from '@/components/layout';
import { Post } from '@/models/contentful/Post';
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
  let platformData = undefined;
  let posts = [];

  const platformDataRes = await fetch(
    `${process.env.API_URL}/contentful-getPlatform?slug=${slug}&preview=${
      preview ? 'true' : 'false'
    }`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (platformDataRes.ok) {
    platformData = await platformDataRes.json();
  }
  if (platformData) {
    const postsRes = await fetch(
      `${process.env.API_URL}/contentful-getAllPostsForPlatform?slug=${platformData.slug}&preview=${
        preview ? 'true' : 'false'
      }&limit=${TOTAL_LIMIT}`,
      {
        headers: {
          authorization: process.env.FUNCTION_AUTH ?? '',
        },
      },
    );
    if (postsRes.ok) {
      posts = await postsRes.json();
    }
  }
  return {
    props: {
      platform: platformData ?? null,
      posts: posts ?? null,
      preview: preview,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  let allPlatforms = [];
  const allPlatformsRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPlatformsWithSlug?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (allPlatformsRes.ok) {
    allPlatforms = await allPlatformsRes.json();
  } else {
    return {
      notFound: true,
    };
  }
  return {
    paths: allPlatforms?.map((platform: Platform) => `/platforms/${platform.slug}`) || [],
    fallback: true,
  };
}
