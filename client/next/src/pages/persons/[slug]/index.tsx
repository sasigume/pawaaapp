import ErrorPage from 'next/error';
import Layout from '@/components/layout';
import { Person } from '@/models/contentful/Person';
import { Box } from '@chakra-ui/react';
import PersonList from '@/components/partials/post/common/person-list';
import { PostForList } from '@/models/contentful/Post';
import PostList from '@/components/partials/post';

interface IndexProps {
  person: Person;
  preview: boolean;
  posts: PostForList[];
}

const TOTAL_LIMIT = 11;

const personIndex = ({ person, preview, posts }: IndexProps) => {
  return (
    <>
      {!person ? (
        <>
          <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }} hideAdsense={true}>
            <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
          </Layout>
        </>
      ) : (
        <Layout
          preview={preview}
          meta={{
            title: `${person.displayName}の紹介`,
            desc: person.description ?? '説明文がありません。',
          }}
          hideAdsense={true}
        >
          <Box mb={16}>
            <Box textStyle="h1" mb={8}>
              <h1>{person.displayName}の紹介</h1>
            </Box>
            <PersonList persons={[person]} />
            <Box my={4}>{person.description ?? '説明文がありません。'}</Box>
          </Box>
          <Box textStyle="h2" mb={8}>
            <h2>
              {posts[0]
                ? `${person.displayName}の記事一覧 最新${posts.length}件`
                : `${person.displayName}の記事はありません`}
            </h2>
          </Box>
          {posts && posts.length > 0 && <PostList mode="archive" posts={posts} />}
        </Layout>
      )}
    </>
  );
};

export default personIndex;

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview = false }: GSProps) {
  const slug = params.slug ?? '';
  let personData = undefined;
  let posts = [];

  const personDataRes = await fetch(
    `${process.env.API_URL}/contentful-getPerson?slug=${slug}&preview=${
      preview ? 'true' : 'false'
    }`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (personDataRes.ok) {
    personData = await personDataRes.json();
  }
  if (personData) {
    const postsRes = await fetch(
      `${process.env.API_URL}/contentful-getAllPostsForPerson?slug=${personData.slug}&preview=${
        preview ? 'true' : 'false'
      }&limit=${TOTAL_LIMIT}`,
      {
        headers: {
          authorization: process.env.FUNCTION_AUTH ?? '',
        },
      },
    );
    if (postsRes.ok) {
      posts = await postsRes.json();
    }
  }
  return {
    props: {
      person: personData ?? null,
      posts: posts ?? null,
      preview: preview,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  let allPersons = [];
  const allPersonsRes = await fetch(
    `${process.env.API_URL}/contentful-getAllPersonsWithSlug?preview=false&limit=${TOTAL_LIMIT}`,
    {
      headers: {
        authorization: process.env.FUNCTION_AUTH ?? '',
      },
    },
  );
  if (allPersonsRes.ok) {
    allPersons = await allPersonsRes.json();
  } else {
    return {
      notFound: true,
    };
  }
  return {
    paths: allPersons?.map((person: Person) => `/persons/${person.slug}`) || [],
    fallback: true,
  };
}
