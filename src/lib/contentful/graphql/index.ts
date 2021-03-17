import { Person } from '@/models/contentful/Person'
import { Platform } from '@/models/contentful/Platform'
import { Post } from '@/models/contentful/Post'
const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600')

const PLATFORM_GRAPHQL_FIELDS = `
sys {
  firstPublishedAt
  publishedAt
}
displayName
description
slug
bgColor
icon {
  name
  style
}
`

const PERSON_GRAPHQL_FIELDS = `
sys {
  firstPublishedAt
  publishedAt
}
displayName
description
slug
picture {
  url
}
`
const POST_GRAPHQL_FIELDS = `
sys {
  firstPublishedAt
  publishedAt
}
title
slug
body
description
publishDate
heroImage {
  url
}
person {
  ${PERSON_GRAPHQL_FIELDS}
}
platformsCollection(limit: 5) {
  items {
    ${PLATFORM_GRAPHQL_FIELDS}
  }
}
`


async function fetchGraphQL(query: any, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  )
  .then((response) => response.json())
  .catch((e)=>console.error(e))
}

function extractPerson(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items?.[0] as Person
}

function extractPersons(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items as Person[]
}
function extractPlatform(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items?.[0] as Platform
}

function extractPlatforms(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items as Platform[]
}

function extractPost(fetchResponse: any) {
  console.log('Fetching: ' + fetchResponse?.data?.blogPostCollection?.items?.[0].slug)
  return fetchResponse?.data?.blogPostCollection?.items?.[0] as Post
}
function extractPosts(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as Post[]
}

function extractPostsFromPerson(fetchResponse: any) {
  return fetchResponse?.data.personCollection?.items[0].linkedFrom.blogPostCollection?.items as Post[]
}

function extractPostsFromPlatform(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items[0].linkedFrom.blogPostCollection?.items as Post[]
}

export async function getPostAndMorePosts(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )

  // CRAZY RANDOMIZE(slash 5 means only show newer content and minimize build time)
  const randomSkipMax = parseInt(process.env.TOTAL_PAGINATION ?? '600') / 10
  const randomSkip = Math.round(Math.random() * randomSkipMax)

  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(skip:${randomSkip} ,where: { slug_not_in: "${slug}" }, order: sys_firstPublishedAt_DESC, preview: ${preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPosts(entries)
  }
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
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(limit:${limit ?? TOTAL_LIMIT},where: { slug_exists: true }, order: sys_firstPublishedAt_DESC,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPosts(entries)
}

export async function getAllPostsByRange(preview: boolean, skip: number, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(skip:${skip ?? 0} ,limit:${limit ?? 10},where: { slug_exists: true }, order: sys_firstPublishedAt_DESC,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPosts(entries)
}
//----------------

export async function getAllPlatformsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      platformCollection(limit: ${limit ?? 5}, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${PLATFORM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPlatforms(entries)
}

export async function getPlatform(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      platformCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PLATFORM_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPlatform(entry)
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
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }
        }
      }
    }`,
    preview
  )
  return extractPostsFromPlatform(entries)
}

export async function getAllPostsForPlatformByRange(slug: string, preview: boolean, skip: number, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      platformCollection(skip:${skip ?? 0} ,limit: 1, where: {slug: "${slug}"}, order: sys_firstPublishedAt_DESC) {
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
    preview
  )
  return extractPostsFromPlatform(entries)
}


// ----------------------------------

export async function getAllPersonsWithSlug(preview: boolean, limit?: number) {
  const entries = await fetchGraphQL(
    `query {
      personCollection(limit: ${limit ?? 5}, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${PERSON_GRAPHQL_FIELDS}
        }
      }
    }` ,
    preview
  )
  return extractPersons(entries)
}

export async function getPerson(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      personCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PERSON_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPerson(entry)
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
    preview
  )
  return extractPostsFromPerson(entries)
}