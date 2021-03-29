import ErrorPage from 'next/error';
import {
  getAllPlatformsWithSlug,
  getPostAndMorePosts,
  getAllPostsWithSlug,
} from '@/lib/contentful/graphql';
import { Post, PostBase } from '@/models/contentful/Post';
import Layout from '@/components/partials/layout';
import { Box, Container, Divider } from '@chakra-ui/react';

//import { PostComment } from '@/models/firebase/PostComment';
import { SITE_URL } from '@/lib/constants';

import { Platform } from '@/models/contentful/Platform';
import Head from 'next/head';

import BreakpointContainer from '@/components/common/breakpoint-container';
import PostList from '@/components/partials/post';
import HeroWithImage from '@/components/common/hero-with-image';
import { useRouter } from 'next/router';
import ReactMarkdownHeading from 'react-markdown-heading';
import FukidashiShare from '@/components/common/fukidashi-share';
//import PostCommentList from '@/components/partials/post-comment/post-comment-list';
import tocStyles from '../../styles/markdown-toc-styles.module.css';
import { SinglePostComponent } from '@/components/partials/post/single-post';

interface PostPageProps {
  firstPost: Post;
  //postComments: PostComment[];
  morePosts: PostBase[];
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  allPlatforms: Platform[];
}

export default function PostPage({
  firstPost,
  //postComments,
  morePosts,
  preview,
  tweetCount,
  revalEnv,
}: PostPageProps) {
  const router = useRouter();

  const Toc = (post: Post) => (
    <Box className={tocStyles['toc']}>
      <ReactMarkdownHeading markdown={post.body} hyperlink />
    </Box>
  );

  return (
    <>
      {!firstPost && router.isFallback ? (
        <>
          <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }}>
            <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
          </Layout>
        </>
      ) : (
        <Layout
          meta={{
            title: firstPost.title,
            desc: firstPost.description ? firstPost.description : '',
            ogpUrl: firstPost.heroImage && firstPost.heroImage.url,
          }}
          revalEnv={revalEnv}
          preview={preview}
          drawerLeftChildren={Toc(firstPost)}
          leftFixedChuldren={
            <Box>
              <FukidashiShare
                tweetText={firstPost.title}
                tweetCount={tweetCount}
                //commentCount={postComments.length}
              />
              {Toc(firstPost)}
            </Box>
          }
          hideAdsense={firstPost.hideAdsense}
        >
          <Head>
            <link
              rel="canonical"
              href={`${process.env.HTTPS_URL ?? ''}/${firstPost.slug ?? ''}/`}
            />
          </Head>
          {firstPost.heroImage && <HeroWithImage src={firstPost.heroImage?.url} />}
          <Box>
            <Container px={0} maxW="container.lg">
              <BreakpointContainer breakpointName="md" actualWidth="650px">
                {preview && <Box>デバッグ: プレビューON</Box>}

                {firstPost && <SinglePostComponent post={firstPost} />}

                <Divider my={8} borderColor="gray.400" />
                {morePosts && morePosts.length > 0 && (
                  <Box my={10}>
                    <PostList mode="more" posts={morePosts} />
                  </Box>
                )}

                {/* 2021-03-26 Disabled
                
                <>
                <Divider my={8} borderColor="gray.400" />

                <Box id="a_comment" textStyle="h2" mb={6}>
                  <h2>コメント</h2>
                </Box>

                <PostCommentList postComments={postComments} post={firstPost} />
                
                </>
                
                */}
              </BreakpointContainer>
            </Container>
          </Box>
        </Layout>
      )}
    </>
  );
}

interface GSProps {
  params: any;
  preview: boolean;
}

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');

export async function getStaticProps({ params, preview }: GSProps) {
  const allPlatforms = await getAllPlatformsWithSlug(preview, 10);

  const posts = await getPostAndMorePosts(params.slug, preview);

  const commentsRes = await fetch(process.env.API_URL + `/api/postComments/${params.slug}`);
  const postComments = await commentsRes.json();

  const searchWord = SITE_URL + '/' + params.slug;

  const tweets = await fetch(
    process.env.API_URL +
      '/api/twitter?word=' +
      encodeURIComponent(searchWord) +
      '&secret=' +
      process.env.TWITTER_SECRET,
  );
  const tweetsJson = await tweets.json();
  let tweetCount;
  tweetsJson.data ? (tweetCount = tweetsJson.meta.result_count) : (tweetCount = null);

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800');
  return {
    props: {
      preview: preview ?? false,
      firstPost: posts.post ?? null,
      postComments: postComments ?? null,
      morePosts: posts.morePosts ?? null,
      tweetCount: tweetCount ?? null,
      revalEnv: revalEnv,
      allPlatforms: allPlatforms ?? null,
      hideAdsense: posts.post.hideAdsense ?? false,
    },
    revalidate: revalEnv,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug(false, TOTAL_LIMIT);
  let paths = allPosts?.map((post: PostBase) => `/${post.slug}/`) ?? [];

  return {
    paths: paths,
    fallback: true,
  };
}
