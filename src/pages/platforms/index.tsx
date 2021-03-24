import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getAllPlatformsWithSlug } from '@/lib/contentful/graphql';
import { Platform } from '@/models/contentful/Platform';
import { Box, VStack, Divider, Container } from '@chakra-ui/react';
import Layout from '@/components/partials/layout';

const PlatformList = dynamic(() => import('@/components/partials/post/common/platform-list'));

interface PlatformIndexProps {
  platforms: Platform[];
  preview: boolean;
}

export default function PlatformIndex({ platforms, preview }: PlatformIndexProps) {
  const router = useRouter();

  if (!router.isFallback && !platforms) {
    return (
      <Layout preview={preview} title={'404 Not found'} desc={''}>
        <ErrorPage title="ページが見つかりませんでした" statusCode={404} />
      </Layout>
    );
  }

  return (
    <>
      {!platforms ? (
        <Layout preview={preview} title={'404 Not found'} desc={''}>
          <ErrorPage title="教科が見つかりませんでした" statusCode={404} />
        </Layout>
      ) : (
        <Layout preview={preview} title={'プラットフォームの一覧'} desc={'プラットフォームの一覧'}>
          <Container>
            <Box mb={10}>
              <VStack textStyle="h1" spacing={4} mb={8}>
                <h1>プラットフォームの一覧</h1>
                <Divider />
              </VStack>
              {platforms && platforms.length > 0 && <PlatformList platforms={platforms} />}
            </Box>
          </Container>
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
  const allPlatforms = await getAllPlatformsWithSlug(preview, 10);

  return {
    props: {
      preview: preview ?? false,
      platforms: allPlatforms ?? null,
    },
    revalidate: 300,
  };
}
