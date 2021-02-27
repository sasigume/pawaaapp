import { Post } from '@/models/contentful/Post'
import { Creator } from '@/models/contentful/Creator'
import { Subject } from '@/models/contentful/Subject'

const LANDING_PAGE_POST_GRAPHQL_FIELDS = `
slug
md
accountId
accountName
accountPicture {
  url
}
good
`

const LANDING_PAGE_GRAPHQL_FIELDS = `
title
slug
description
topImage {
  url
}
message
md
postsCollection {
  items {
    ${LANDING_PAGE_POST_GRAPHQL_FIELDS}
  }
}
screenshotsCollection {
  items {
    url
  }
}
`


const CREATOR_GRAPHQL_FIELDS = `
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

const SUBJECT_GRAPHQL_FIELDS = `
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

const POST_GRAPHQL_FIELDS = `
  sys {
    firstPublishedAt
    publishedAt
  }
  slug
  displayName
  intro
  image {
    url
  }
  md
  creatorsCollection(limit: 5) {
    items {
      ${CREATOR_GRAPHQL_FIELDS}
    }
  }
  subjectsCollection(limit: 5) {
    items {
      ${SUBJECT_GRAPHQL_FIELDS}
    }
  }
`

// メモ: 55以上記事を取得しようとすると11110/11000で制限オーバーになる

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
  ).then((response) => response.json())
}

function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items?.[0] as Post
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items as Post[]
}

function extractCreator(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items?.[0] as Creator
}

function extractCreators(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items as Creator[]
}

function extractPostEntriesFromCreator(fetchResponse: any) {
  return fetchResponse?.data.creatorCollection?.items[0].linkedFrom.postCollection?.items as Post[]
}

function extractSubject(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items?.[0] as Subject
}

function extractSubjects(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items as Subject[]
}

function extractPostEntriesFromSubject(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items[0].linkedFrom.postCollection?.items as Post[]
}

function extractLandingPage(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items?.[0] as Post
}


export async function getPreviewPostBySlug(slug: string) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview: boolean, limit = 5) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(limit: 5, order: sys_firstPublishedAt_DESC,preview: ${preview ? true : false}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: sys_firstPublishedAt_DESC, preview: ${preview ? 'true' : 'false'
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
    morePosts: extractPostEntries(entries),
  }
}

export async function getAllCreatorsWithSlug(preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      creatorCollection(limit: 5, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${CREATOR_GRAPHQL_FIELDS}
        }
      }
    }` ,
    preview
  )
  return extractCreators(entries)
}

export async function getCreator(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      creatorCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${CREATOR_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractCreator(entry)
}

export async function getAllPostsForCreator(slug: string, preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      creatorCollection(limit: 1, where: {slug: "${slug}"}, order: sys_firstPublishedAt_DESC) {
        items {
          displayName
          linkedFrom {
            postCollection {
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
  return extractPostEntriesFromCreator(entries)
}

export async function getAllSubjectsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      subjectCollection(limit: 5, where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${SUBJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractSubjects(entries)
}

export async function getSubject(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      subjectCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${SUBJECT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractSubject(entry)
}

export async function getAllPostsForSubject(slug: string, preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      subjectCollection(limit: 1, where: {slug: "${slug}"}, order: sys_firstPublishedAt_DESC) {
        items {
          displayName
          linkedFrom {
            postCollection {
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
  return extractPostEntriesFromSubject(entries)
}

export async function getLandingPage(slug: string, preview: boolean) {
  const entry = await fetchGraphQL(
    `query {
      landingPageCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${LANDING_PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractLandingPage(entry)
}