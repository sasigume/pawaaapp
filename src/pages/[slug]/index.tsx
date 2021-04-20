import { SinglePostComponent } from '@/components/partials/post/single-post';
import { getPostAndMorePosts, getAllPostsWithSlugOnlySlug } from '@/lib/contentful/graphql';
import { Post, PostForList, PostOnlySlug } from '@/models/contentful/Post';
import Layout from '@/components/layout';
import { Box, Center, Divider } from '@chakra-ui/react';
import { SITE_URL } from '@/lib/constants';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PostList from '@/components/partials/post';
import { BlogPostData } from '@/models/firebase/BlogPostData';

interface PostPageProps {
  firstPost: Post;
  morePosts: PostForList[];
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  blogPostData: BlogPostData;
}

export default function PostPage({
  firstPost,
  morePosts,
  preview,
  tweetCount,
  revalEnv,
  blogPostData,
}: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout preview={preview} meta={{ title: 'ロード中', desc: '' }} hideAdsense={true}>
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
          hideAdsense={firstPost.hideAdsense ?? false}
          post={firstPost}
        >
          <Head>
            <link
              rel="canonical"
              href={`${process.env.HTTPS_URL ?? ''}/${firstPost.slug ?? ''}/`}
            />
          </Head>
          <Box>
            {preview && <Box>デバッグ: プレビューON</Box>}

            {firstPost && (
              <SinglePostComponent
                post={firstPost}
                tweetCount={tweetCount ?? 0}
                likeCount={blogPostData.like ?? 0}
                dislikeCount={blogPostData.dislike ?? 0}
              />
            )}

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
    process.env.API_URL + '/twitter?word=NYC' + encodeURIComponent(searchWord),
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  const tweetsJson = await tweets.json();
  let tweetCount;
  tweetsJson.data ? (tweetCount = tweetsJson.meta.result_count) : (tweetCount = null);

  const revalEnv = parseInt(process.env.REVALIDATE_SINGLE ?? '3600');

  if (!posts.post) {
    return {
      notFound: true,
    };
  }
  const pageProps = {
    preview: preview ?? false,
    firstPost: posts.post ?? null,
    morePosts: posts.morePosts ?? [],
    tweetCount: tweetCount ?? 0,
    revalEnv: revalEnv,
    hideAdsense: (posts.post && posts.post.hideAdsense == true) ?? false,
    blogPostData: blogPostData ?? {
      like: 0,
      dislike: 0,
    },
  };
  if (pageProps.firstPost) {
    console.info(
      `ISR ready for: ${pageProps.firstPost.title} ${
        pageProps.hideAdsense ? '(Ad disabled)' : ''
      } / ${pageProps.tweetCount} tweets / ${pageProps.blogPostData.like} likes`,
    );
  }
  return { props: pageProps, revalidate: revalEnv };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlugOnlySlug(false, TOTAL_LIMIT);
  let paths = allPosts?.map((post: PostOnlySlug) => `/${post.slug}/`) ?? [];

  return {
    paths: paths,
    fallback: false,
  };
}
