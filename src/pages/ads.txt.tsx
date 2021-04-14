import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const text = `google.com, ${process.env.GOOGLE_AD_CLIENT}, DIRECT, ${process.env.ADSENSE_AUTH_ID}`;

  res.statusCode = 200;
  res.setHeader('Cache-Control', `s-maxage=86400, stale-while-revalidate`);
  res.setHeader('Content-Type', 'text/plain');
  res.end(text);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
