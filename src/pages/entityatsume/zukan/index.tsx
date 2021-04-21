import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Entity } from '@/models/nest/Entity';
import { VStack, Divider } from '@chakra-ui/react';
import Layout from '@/components/layout';
import EntityList from '@/components/partials/entity/';
import { getAllEntities } from '@/lib/nest/entities';

interface EntityIndexProps {
  entities: Entity[];
  preview: boolean;
}

export default function EntityIndex({ entities, preview }: EntityIndexProps) {
  const router = useRouter();

  if (!router.isFallback && !entities) {
    return (
      <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }} hideAdsense={true}>
        <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
      </Layout>
    );
  }

  return (
    <>
      {!entities ? (
        <Layout preview={preview} meta={{ title: '404 Not found', desc: '' }} hideAdsense={true}>
          <ErrorPage title="教科が見つかりませんでした" statusCode={404} />
        </Layout>
      ) : (
        <Layout
          preview={preview}
          meta={{ title: 'エンティティの一覧', desc: 'エンティティの一覧' }}
        >
          <VStack textStyle="h1" spacing={4} mb={8}>
            <h1>エンティティの一覧</h1>
            <Divider />
          </VStack>
          {entities && entities.length > 0 && <EntityList entities={entities} />}
        </Layout>
      )}
    </>
  );
}

interface GSProps {
  params: any;
  preview: boolean;
}

export async function getStaticProps({ preview }: GSProps) {
  const allEntities = await getAllEntities({ useStaging: false });

  return {
    props: {
      preview: preview ?? false,
      entities: allEntities ?? null,
    },
    revalidate: 300,
  };
}
