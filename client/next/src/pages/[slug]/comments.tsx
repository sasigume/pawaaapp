import ErrorPage from 'next/error';
import { Post, PostOnlySlug } from '@/models/contentful/Post';
import Layout from '@/components/layout';
import { Box } from '@chakra-ui/react';
import { PostComment } from '@/models/firebase/PostComment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PostCommentList from '@/components/partials/post-comment/post-comment-list';

interface CommentPageProps {
  firstPost: Post;
  postComments: PostComment[];
  preview: boolean;
  revalEnv: number;
}

export default function PostPage({ firstPost, postComments, preview, revalEnv }: CommentPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout preview={preview} meta={{ title: 'ロード中', desc: '' }}>
        記事を探しています...
      </Layout>
    );
  } else {
    return (
      <>
        {!firstPost ? (
          <>
            <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }}>
              <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
            </Layout>
          </>
        ) : (
          <Layout
            meta={{
              title: firstPost.title + 'のコメント',
              desc: firstPost.title + 'のコメント',
            }}
            revalEnv={revalEnv}
            preview={preview}
            hideAdsense={true}
          >
            <Head>
              <link
                rel="canonical"
                href={`${process.env.HTTPS_URL ?? ''}/${firstPost.slug ?? ''}/`}
              />
            </Head>
            <Box>
              {preview && <Box>デバッグ: プレビューON</Box>}
              <>
                <Box id="a_comment" textStyle="h2" mb={6}>
                  <h2>{firstPost.title}のコメント</h2>
                </Box>

                <PostCommentList postComments={postComments} post={firstPost} />
              </>
            </Box>
          </Layout>
        )}
      </>
    );
  }
}

interface GSProps {
  params: any;
  preview: boolean;
}

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');

export async function getStaticProps({ params, preview }: GSProps) {
  const postsRes = await fetch(
    `${process.env.API_URL}/contentful-getPostAndMorePosts?preview=${
      preview ? 'true' : 'false'
    }&slug=${params.slug}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  let posts = [];
  if (postsRes.ok) {
    posts = await postsRes.json();
  }
  let postComments = [];
  const commentsRes = await fetch(process.env.API_URL + `/postComments?slug=${params.slug}`, {
    headers: {
      authorization: process.env.FUNCTION_AUTH ?? '',
    },
  });
  if (commentsRes.ok) {
    postComments = await commentsRes.json();
  }

  const revalEnv = parseInt(process.env.REVALIDATE_SINGLE ?? '3600');
  if (!posts.post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      preview: preview ?? false,
      firstPost: posts.post ?? null,
      postComments: postComments ?? null,
      revalEnv: revalEnv,
      hideAdsense: posts.post.hideAdsense ?? false,
    },
    revalidate: revalEnv,
  };
}

export async function getStaticPaths() {
  const allPostsRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPostsWithSlugOnlySlug?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  let paths = [];
  if (allPostsRes.ok) {
    const allPosts = await allPostsRes.json();
    paths = allPosts?.map((post: PostOnlySlug) => `/${post.slug}/comments`) ?? [];
  }

  return {
    paths: paths,
    fallback: false,
  };
}
