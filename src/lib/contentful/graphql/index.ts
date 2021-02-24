const CREATOR_GRAPHQL_FIELDS = `
displayName
slug
picture {
  url
}
`

const SUBJECT_GRAPHQL_FIELDS = `
displayName
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
  creatorsCollection {
    items {
      ${CREATOR_GRAPHQL_FIELDS}
    }
  }
  subjectsCollection {
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
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items
}

function extractCreator(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items?.[0]
}

function extractCreatorEntries(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items
}

function extractSubject(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items?.[0]
}

function extractSubjectEntries(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items
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
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
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
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${preview ? 'true' : 'false'
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

export async function getAllCreatorsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      creatorCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${CREATOR_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractCreatorEntries(entries)
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

export async function getAllPostsForCreator(slug:string, preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      creatorCollection(where: {slug: "${slug}"}) {
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
  return extractCreatorEntries(entries)
}

export async function getAllSubjectWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      subjectCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${SUBJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractCreatorEntries(entries)
}

export async function getSubject(slug: string, preview: boolean) {
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

export async function getAllPostsForSubject(slug:string, preview: boolean) {
  const entries = await fetchGraphQL(
    `query {
      subjectCollection(where: {slug: "${slug}"}) {
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
  return extractSubjectEntries(entries)
}