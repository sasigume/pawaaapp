import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostList from '@/components/partials/post';
import Layout from '@/components/partials/layout';
import {
  getPlatform,
  getAllPlatformsWithSlug,
  getAllPostsForPlatform,
} from '@/lib/contentful/graphql';
import { Post } from '@/models/contentful/Post';
import { Platform } from '@/models/contentful/Platform';
import { Box, Container } from '@chakra-ui/react';

interface IndexProps {
  platform: Platform;
  posts: Post[];
  preview: boolean;
}

const platformIndex = ({ platform, posts, preview }: IndexProps) => {
  const router = useRouter();
  return (
    <>
      {!platform ? (
        <>
          <Layout preview={preview} title={'404 Not found'} desc={''}>
            <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
          </Layout>
        </>
      ) : (
        <Layout preview={preview} title={`${platform.displayName}の記事一覧`} desc={'Pawaa.app'}>
          <Container maxW="container.lg">
            <Box mb={16}>
              <Box textStyle="h1" mb={8}>
                <h1>
                  {posts[0]
                    ? `${platform.displayName}の記事一覧`
                    : `${platform.displayName}の記事はありません`}
                </h1>
              </Box>
              {platform.description && <div className="my-4">{platform.description}</div>}
              {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
            </Box>
          </Container>
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

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? '';
  let posts: Post[];
  let allPosts: Post[];
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
  const allplatforms = await getAllPlatformsWithSlug(false);
  return {
    paths: allplatforms?.map((a: any) => `/platforms/${a.slug}`) || [],
    fallback: true,
  };
}
