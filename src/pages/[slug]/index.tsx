import { SinglePostComponent } from '@/components/partials/post/single-post';
import dynamic from 'next/dynamic';
import ErrorPage from 'next/error';
import { getPostAndMorePosts, getAllPostsWithSlugOnlySlug } from '@/lib/contentful/graphql';
import { Post, PostForList, PostOnlySlug } from '@/models/contentful/Post';
import Layout from '@/components/partials/layout';
import { Box, Divider } from '@chakra-ui/react';
//import { PostComment } from '@/models/firebase/PostComment';
import { SITE_URL } from '@/lib/constants';
import Head from 'next/head';
import { useRouter } from 'next/router';
//import PostCommentList from '@/components/partials/post-comment/post-comment-list';

const PostList = dynamic(() => import('@/components/partials/post'));
const ReactMarkdownHeading = dynamic(() => import('react-markdown-heading'));
const FukidashiShare = dynamic(() => import('@/components/common/fukidashi-share'));
const Adsense = dynamic(() => import('@/components/common/adsense'), { ssr: false });
import tocStyles from '../../styles/markdown-toc-styles.module.css';

interface PostPageProps {
  firstPost: Post;
  //postComments: PostComment[];
  morePosts: PostForList[];
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  drawerPosts: Post[];
}

export default function PostPage({
  firstPost,
  //postComments,
  morePosts,
  preview,
  tweetCount,
  revalEnv,
  drawerPosts,
}: PostPageProps) {
  const router = useRouter();

  const Toc = (post: Post) => (
    <Box my={8} className={tocStyles['toc']}>
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
          asideChildren={
            <Box>
              <FukidashiShare
                tweetText={firstPost.title}
                tweetCount={tweetCount}
                //commentCount={postComments.length}
              />
              {Toc(firstPost)}
              {!firstPost.hideAdsense && <Adsense slot={'8321176059'} />}
            </Box>
          }
          hideAdsense={firstPost.hideAdsense}
          drawerPosts={drawerPosts ?? []}
        >
          <Head>
            <link
              rel="canonical"
              href={`${process.env.HTTPS_URL ?? ''}/${firstPost.slug ?? ''}/`}
            />
          </Head>
          <Box>
            {preview && <Box>デバッグ: プレビューON</Box>}

            {firstPost && <SinglePostComponent post={firstPost} tweetCount={tweetCount ?? 0} />}

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
  const posts = await getPostAndMorePosts(params.slug, preview);

  /*const commentsRes = await fetch(process.env.API_URL + `/api/postComments/${params.slug}`);
  const postComments = await commentsRes.json();*/

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

  //const drawerPosts = (await getSeries('popular')) ?? null;

  const revalEnv = parseInt(process.env.REVALIDATE_SINGLE ?? '3600');
  return {
    props: {
      preview: preview ?? false,
      firstPost: posts.post ?? null,
      //postComments: postComments ?? null,
      morePosts: posts.morePosts ?? null,
      tweetCount: tweetCount ?? null,
      revalEnv: revalEnv,
      hideAdsense: posts.post.hideAdsense ?? false,
      //drawerPosts: drawerPosts.postsCollection.items ?? null,
    },
    revalidate: revalEnv,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlugOnlySlug(false, TOTAL_LIMIT);
  let paths = allPosts?.map((post: PostOnlySlug) => `/${post.slug}/`) ?? [];

  return {
    paths: paths,
    fallback: true,
  };
}
