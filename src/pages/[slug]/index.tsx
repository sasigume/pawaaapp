import { SinglePostComponent } from '@/components/partials/post/single-post';
import ErrorPage from 'next/error';
import { getPostAndMorePosts, getAllPostsWithSlugOnlySlug } from '@/lib/contentful/graphql';
import { Post, PostForList, PostOnlySlug } from '@/models/contentful/Post';
import Layout from '@/components/partials/layout';
import { Box, Center, Divider, SkeletonText } from '@chakra-ui/react';
import { SITE_URL } from '@/lib/constants';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PostList from '@/components/partials/post';
import ReactMarkdownHeading from 'react-markdown-heading';
import FukidashiShare from '@/components/common/fukidashi-share';
import tocStyles from '../../styles/markdown-toc-styles.module.css';
import { BlogPostData } from '@/models/firebase/BlogPostData';

interface PostPageProps {
  firstPost: Post;
  morePosts: PostForList[];
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  drawerPosts: Post[];
  blogPostData: BlogPostData;
}

export default function PostPage({
  firstPost,
  morePosts,
  preview,
  tweetCount,
  revalEnv,
  drawerPosts,
  blogPostData,
}: PostPageProps) {
  const router = useRouter();

  const Toc = (post: Post) => (
    <Box my={8} className={tocStyles['toc']}>
      <ReactMarkdownHeading markdown={post.body} hyperlink />
    </Box>
  );
  if (router.isFallback) {
    return (
      <Layout preview={preview} meta={{ title: 'ロード中', desc: '' }}>
        <Center py={8}>
          記事を探しています... (初回アクセスの場合はまさに今ページを生成しています！
          <br />
          ...404の場合が多いけどね。)
        </Center>
      </Layout>
    );
  } else {
    return (
      <>
        <Layout
          meta={{
            title: firstPost.title,
            desc: firstPost.description ? firstPost.description : '',
            ogpUrl: firstPost.heroImage && firstPost.heroImage.url,
          }}
          revalEnv={revalEnv}
          preview={preview}
          drawerLeftChildren={
            <>
              <FukidashiShare
                tweetText={firstPost.title}
                tweetCount={tweetCount}
                slug={firstPost.slug}
                likeCount={blogPostData.like ?? 0}
              />
              {Toc(firstPost)}
            </>
          }
          asideChildren={
            <Box>
              <FukidashiShare
                tweetText={firstPost.title}
                tweetCount={tweetCount}
                slug={firstPost.slug}
                likeCount={blogPostData.like ?? 0}
              />
              {Toc(firstPost)}
            </Box>
          }
          hideAdsense={firstPost.hideAdsense ?? false}
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
                <PostList mode="more" posts={morePosts} enableAd={!firstPost.hideAdsense ?? true} />
              </Box>
            )}
          </Box>
        </Layout>
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
  const posts = await getPostAndMorePosts(params.slug, preview);

  const blogPostDataRes = await fetch(process.env.API_URL + `/blogPosts?slug=${params.slug}`, {
    headers: {
      authorization: process.env.FUNCTION_AUTH ?? '',
    },
  });
  const blogPostData = (await blogPostDataRes.json()) as BlogPostData;

  const searchWord = SITE_URL + '/' + params.slug;

  const tweets = await fetch(
    process.env.API_URL + '/twitter?word=' + encodeURIComponent(searchWord),
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  const tweetsJson = await tweets.json();
  let tweetCount;
  tweetsJson.data ? (tweetCount = tweetsJson.meta.result_count) : (tweetCount = null);

  //const drawerPosts = (await getSeries('popular')) ?? null;

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
      morePosts: posts.morePosts ?? null,
      tweetCount: tweetCount ?? null,
      revalEnv: revalEnv,
      hideAdsense: (posts.post && posts.post.hideAdsense == true) ?? false,
      //drawerPosts: drawerPosts.postsCollection.items ?? null,
      blogPostData: blogPostData ?? null,
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
