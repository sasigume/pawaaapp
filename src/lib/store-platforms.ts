import { Platform } from '@/models/contentful/Platform';
//import { getAllPlatformsWithSlug } from './contentful/graphql';

// ほぼ変わらないのでハードコーディング
const storeAllPlatforms = async (): Promise<Platform[]> => {
  //return (await getAllPlatformsWithSlug(false)) ?? [];
  return [
    {
      sys: {
        firstPublishedAt: '2021-03-12T11:42:45.368Z',
        publishedAt: '2021-03-12T11:42:45.368Z',
      },
      displayName: 'Windows 10',
      description: null,
      slug: 'windows10',
      bgColor: 'cyan',
      icon: null,
    },
    {
      sys: {
        firstPublishedAt: '2021-03-12T10:17:47.192Z',
        publishedAt: '2021-03-12T11:33:39.158Z',
      },
      displayName: 'Nintendo Switch',
      description: 'ニンテンドースイッチに対応した記事の一覧です。',
      slug: 'nintendoswitch',
      bgColor: 'red',
      icon: {
        sys: {
          firstPublishedAt: '2021-03-12T11:33:35.421Z',
          publishedAt: '2021-03-12T11:35:00.772Z',
        },
        name: 'dice-two',
        style: 'fas',
      },
    },
    {
      sys: {
        firstPublishedAt: '2021-03-12T11:27:03.775Z',
        publishedAt: '2021-03-12T11:27:03.775Z',
      },
      displayName: 'PlayStation',
      description: 'プレステ対応記事の一覧です。',
      slug: 'playstation',
      bgColor: 'blue',
      icon: {
        sys: {
          firstPublishedAt: '2021-03-12T11:26:32.239Z',
          publishedAt: '2021-03-12T11:26:32.239Z',
        },
        name: 'playstation',
        style: 'fab',
      },
    },
    {
      sys: {
        firstPublishedAt: '2021-03-12T11:25:55.166Z',
        publishedAt: '2021-03-12T11:25:55.166Z',
      },
      displayName: 'Xbox',
      description: 'Xbox対応記事の一覧です。',
      slug: 'xbox',
      bgColor: 'green',
      icon: {
        sys: {
          firstPublishedAt: '2021-03-12T11:25:51.604Z',
          publishedAt: '2021-03-12T11:25:51.604Z',
        },
        name: 'xbox',
        style: 'fab',
      },
    },
    {
      sys: {
        firstPublishedAt: '2021-03-12T11:25:26.833Z',
        publishedAt: '2021-03-12T11:25:26.833Z',
      },
      displayName: 'Java版',
      description: 'Java Edition対応記事の一覧です。',
      slug: 'java',
      bgColor: 'orange',
      icon: {
        sys: {
          firstPublishedAt: '2021-03-12T11:25:21.861Z',
          publishedAt: '2021-03-12T11:25:21.861Z',
        },
        name: 'java',
        style: 'fab',
      },
    },
  ];
};

export default storeAllPlatforms;
