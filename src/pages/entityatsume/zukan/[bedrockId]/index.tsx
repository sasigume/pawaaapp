import ErrorPage from 'next/error';
import { Entity } from '@/models/nest/Entity';
import Layout from '@/components/partials/layout';
import { Box, Center, Heading } from '@chakra-ui/react';

import { Platform } from '@/models/contentful/Platform';
import Head from 'next/head';

import EntityList from '@/components/partials/entity';
import { useRouter } from 'next/router';
import { getAllEntities, getEntity } from '@/lib/nest/entities';

interface EntityPageProps {
  firstEntity: Entity;
  preview: boolean;
  tweetCount: number;
  revalEnv: number;
  allPlatforms: Platform[];
}

export default function EntityPage({ preview, firstEntity, revalEnv }: EntityPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout preview={preview} meta={{ title: 'Loading', desc: '' }}>
        ロード中
      </Layout>
    );
  } else {
    return (
      <>
        {!firstEntity ? (
          <>
            <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }}>
              <ErrorPage title="記事が見つかりませんでした" statusCode={404} />
            </Layout>
          </>
        ) : (
          <Layout
            meta={{
              title: firstEntity.name,
              desc: firstEntity.description ? firstEntity.description : '',
            }}
            revalEnv={revalEnv}
            preview={preview}
          >
            <Head>
              <link
                rel="canonical"
                href={`${process.env.HTTPS_URL ?? ''}/entityatsume/zukan/${
                  firstEntity.bedrockId ?? ''
                }/`}
              />
            </Head>
            <Box py={20}>
              {preview && <Box>デバッグ: プレビューON</Box>}

              {firstEntity && (
                <>
                  <Center mb={6}>
                    <Heading as="h1">{firstEntity.nameJapanese ?? firstEntity.name}</Heading>
                  </Center>
                  <EntityList mode="single" entities={[firstEntity]} expand={preview ?? false} />
                </>
              )}
            </Box>
          </Layout>
        )}
      </>
    );
  }
}

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ params, preview }: GSProps) {
  const entity = await getEntity(params.bedrockId);

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800');

  if (!entity) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      preview: preview ?? false,
      firstEntity: entity ?? null,
      revalEnv: revalEnv,
    },
    revalidate: revalEnv,
  };
}

export async function getStaticPaths() {
  const allEntities = await getAllEntities({ useStaging: false });
  let paths =
    allEntities?.map((entity: Entity) => `/entityatsume/zukan/${entity.bedrockId}/`) ?? [];

  return {
    paths: paths,
    fallback: true,
  };
}
