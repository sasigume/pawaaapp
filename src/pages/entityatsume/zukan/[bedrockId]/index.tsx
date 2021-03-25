import ErrorPage from 'next/error';
import { Entity } from '@/models/nest/Entity';
import Layout from '@/components/partials/layout';
import { Box, Container } from '@chakra-ui/react';

import { Platform } from '@/models/contentful/Platform';
import Head from 'next/head';

import BreakpointContainer from '@/components/common/breakpoint-container';
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

  return (
    <>
      {!firstEntity && router.isFallback ? (
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
          <Box>
            <Container px={0} maxW="container.lg">
              <BreakpointContainer breakpointName="md" actualWidth="650px">
                {preview && <Box>デバッグ: プレビューON</Box>}

                {firstEntity && (
                  <EntityList mode="single" entities={[firstEntity]} expand={preview ?? false} />
                )}
              </BreakpointContainer>
            </Container>
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

export async function getStaticProps({ params, preview }: GSProps) {
  const entity = await getEntity(params.bedrockId);
  entity && console.log(`Fetched ${entity.name}`);

  const revalEnv = parseInt(process.env.REVALIDATE ?? '1800');
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
