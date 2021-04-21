// https://zenn.dev/catnose99/articles/c441954a987c24

import { SITE_FULL_URL } from '@/lib/constants';
import { PostForRss } from '@/models/contentful/Post';
import { GetServerSidePropsContext } from 'next';

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '700');

async function generateSitemapXml(): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  let allPostsForRSS = [];
  const allPostsForRSSRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPostsForRss?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (allPostsForRSSRes.ok) {
    allPostsForRSS = await allPostsForRSSRes.json();
  }
  allPostsForRSS.forEach((post: PostForRss) => {
    xml += `
      <url>
        <loc>${SITE_FULL_URL}/${post.slug}/</loc>
        <lastmod>${post.publishDate ?? post.sys.publishedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml();
  const revalidate = parseInt(process.env.REVALIDATE_RSSSITEMAP ?? '14400');

  res.statusCode = 200;
  res.setHeader('Cache-Control', `s-maxage=${revalidate}, stale-while-revalidate`);
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
