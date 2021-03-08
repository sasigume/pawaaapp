import { Creator } from '@/models/contentful/Creator'
import { Subject } from '@/models/contentful/Subject'
import { LandingPage } from '@/models/contentful/LandingPage'
import { Book } from '@/models/contentful/Book'
import { Post } from '@/models/contentful/Post'

const AUTHOR_GRAPHQL_FIELDS = `
id
name
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
heroImage {
  url
}
author {
  ${AUTHOR_GRAPHQL_FIELDS}
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
  ).then((response) => response.json())
}
function extractCreator(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items?.[0] as Creator
}

function extractCreators(fetchResponse: any) {
  return fetchResponse?.data?.creatorCollection?.items as Creator[]
}
function extractSubject(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items?.[0] as Subject
}

function extractSubjects(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items as Subject[]
}


function extractBook(fetchResponse: any) {
  return fetchResponse?.data?.bookCollection?.items?.[0] as Book
}

function extractBooks(fetchResponse: any) {
  return fetchResponse?.data?.bookCollection?.items as Book[]
}

function extractBooksFromCreator(fetchResponse: any) {
  return fetchResponse?.data.creatorCollection?.items[0].linkedFrom.bookCollection?.items as Book[]
}

function extractBooksFromSubject(fetchResponse: any) {
  return fetchResponse?.data.subjectCollection?.items[0].linkedFrom.bookCollection?.items as Book[]
}

//-----------------
function extractPost(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items?.[0] as Post
}
function extractPosts(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as Post[]
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
  const randomSkipMax = parseInt(process.env.TOTAL_PAGINATION ?? '600')/10
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

export async function getAllPostsWithSlug(preview: boolean, limit?:number) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(limit:${limit ?? 100},where: { slug_exists: true }, order: sys_firstPublishedAt_DESC,preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPosts(entries)
}

export async function getAllPostsByRange(preview: boolean, skip:number, limit?:number) {
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
