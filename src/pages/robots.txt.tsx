// https://zenn.dev/catnose99/articles/c441954a987c24

import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const text = `Sitemap: ${process.env.HTTPS_URL}/sitemap.xml`;
  const revalidate = parseInt(process.env.REVALIDATE_RSSSITEMAP ?? '14400');

  res.statusCode = 200;
  res.setHeader('Cache-Control', `s-maxage=${revalidate}, stale-while-revalidate`);
  res.setHeader('Content-Type', 'text/plain');
  res.end(text);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
