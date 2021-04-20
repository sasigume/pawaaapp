import Layout from '@/components/layout';
import ErrorPage from 'next/error';
export default function Custom404() {
  return (
    <Layout preview={false} meta={{ title: '記事が見つかりませんでした', desc: '' }}>
      <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
    </Layout>
  );
}
