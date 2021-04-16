import * as extracter from './extracter';
const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '1000');

import {
  POST_GRAPHQL_FIELDS,
  POSTFORLIST_GRAPHQL_FIELDS,
  POSTFORRSS_GRAPHQL_FIELDS,
} from '../../../models/contentful/Post';

import { PERSON_GRAPHQL_FIELDS } from '@/models/contentful/Person';

import { PLATFORM_GRAPHQL_FIELDS } from '@/models/contentful/Platform';
import { SERIES_GRAPHQL_FIELDS } from '@/models/contentful/Series';

export async function fetchGraphQL(query: any, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  )
    .then((response) => response.json())
    .catch((e) => console.error(e));
}

export async function getPostAndMorePosts(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  // CRAZY RANDOMIZE(slash 5 means only show newer content and minimize build time)
  const randomSkipMax = parseInt(process.env.TOTAL_PAGINATION ?? '600') / 5;
  const randomSkip = Math.round(Math.random() * randomSkipMax);

  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(skip:${randomSkip} ,where: { slug_not_in: "${slug}" }, order: publishDate_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POSTFORLIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extracter.extractPost(entry),
    morePosts: extracter.extractPostForLists(entries),
  };
}

export async function getSeries(slug: string) {
  const entry = await fetchGraphQL(
    `query {
      seriesCollection(where: { slug: "${slug}" }, preview: false, limit: 1) {
        items {
          ${SERIES_GRAPHQL_FIELDS}
        }
      }
    }`,
    false,
  );
  return extracter.extractSeries(entry);
}

export async function getPreviewPost(slug: string) {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extracter.extractPost(entry);
}

export async function getAllPostsForRss(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    /* ---------------------
    この関数はRSS, sitemapで使います
    --------------------------*/
    `query {
      blogPostCollection(limit:${
        limit ?? TOTAL_LIMIT
      },where: { slug_exists: true }, order: sys_firstPublishedAt_DESC, preview: ${
      preview ? 'true' : 'false'
    }) {
        items {
          ${POSTFORRSS_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostsForRss(entries);
}

export async function getAllPostsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(limit:${
        limit ?? TOTAL_LIMIT
      },where: { slug_exists: true }, order: sys_firstPublishedAt_DESC, preview: ${
      preview ? 'true' : 'false'
    }) {
        items {
          ${POSTFORLIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostForLists(entries);
}

export async function getAllPostsWithSlugOnlySlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    /* ---------------------
    この関数は全記事の数の取得専用
    --------------------------*/
    `query {
      blogPostCollection(limit:${
        limit ?? TOTAL_LIMIT
      },where: { slug_exists: true }, order: sys_firstPublishedAt_DESC, preview: ${
      preview ? 'true' : 'false'
    }) {
        items {
          slug
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostSlugs(entries);
}

export async function getAllPostsByRange(preview: boolean, skip: number, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(skip:${skip ?? 0} ,limit:${
      limit ?? 10
    },where: { slug_exists: true }, order: publishDate_DESC,preview: ${
      preview ? 'true' : 'false'
    }) {
        items {
          ${POSTFORLIST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );

  return extracter.extractPostForLists(entries);
}
//----------------

export async function getAllPlatformsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      platformCollection(limit: ${
        limit ?? 5
      }, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${PLATFORM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPlatforms(entries);
}

export async function getPlatform(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      platformCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PLATFORM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPlatform(entry);
}

export async function getAllPostsForPlatform(slug: string, preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      platformCollection(limit: 1, where: {slug: "${slug}"}, order: sys_firstPublishedAt_DESC) {
        items {
          displayName
          linkedFrom {
            blogPostCollection(limit:${limit ?? TOTAL_LIMIT}){
              items {
                ${POSTFORLIST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostForListsFromPlatform(entries);
}

export async function getAllPostsForPlatformByRange(
  slug: string,
  preview: boolean,
  skip: number,
  limit?: number,
) {
  const entries = await fetchGraphQL(
    `query {
      platformCollection(skip:${
        skip ?? 0
      } ,limit: 1, where: {slug: "${slug}"}, order:sys_firstPublishedAt_DESC) {
        items {
          displayName
          linkedFrom {
            blogPostCollection(limit:${limit ?? TOTAL_LIMIT}){
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostForListsFromPlatform(entries);
}

// ----------------------------------

export async function getAllPersonsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      personCollection(limit: ${
        limit ?? 5
      }, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC]) {
        items {
          ${PERSON_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPersons(entries);
}

export async function getPerson(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      personCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PERSON_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extracter.extractPerson(entry);
}

export async function getAllPostsForPerson(slug: string, preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      personCollection(limit: 1, where: {slug: "${slug}"}, order: sys_firstPublishedAt_DESC) {
        items {
          displayName
          linkedFrom {
            blogPostCollection(limit:${limit ?? TOTAL_LIMIT}) {
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }`,
    preview,
  );
  return extracter.extractPostForListsFromPerson(entries);
}
