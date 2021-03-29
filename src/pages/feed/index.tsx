// https://zenn.dev/catnose99/articles/c7754ba6e4adac

import { SITE_DESC, SITE_FULL_URL, SITE_NAME } from '@/lib/constants';
import { getAllPostsForRss } from '@/lib/contentful/graphql';
import { GetServerSidePropsContext } from 'next';
import RSS from 'rss';

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600');

async function generateFeedXml() {
  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESC,
    site_url: SITE_FULL_URL,
    feed_url: SITE_FULL_URL + '/feed/',
    language: 'ja',
  });

  const posts = (await getAllPostsForRss(false, TOTAL_LIMIT)) ?? [];
  posts?.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description ?? '',
      author: post.person?.displayName ?? '',
      date: new Date(post.publishDate ?? post.sys.firstPublishedAt),
      url: `${process.env.HTTPS_URL}/${post.slug}/`,
    });
  });

  return feed.xml({ indent: true });
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=14400, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
