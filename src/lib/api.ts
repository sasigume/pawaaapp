
export async function fetchAPI(query: any, { variables, preview }: any = {}) {
  let token
  preview ? token = process.env.STORYBLOK_PREVIEW_TOKEN : token = process.env.STORYBLOK_PUBLIC_TOKEN

  const headerOption = {
    'Content-Type': 'application/json',
    Token: token ?? '',
    Version: preview ? 'draft' : 'published',
  }
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: headerOption,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      PostItems {
        items {
          slug
        }
      }
    }
  `)
  return data?.PostItems.items
}

export async function getTagsWithSlug() {
  const data = await fetchAPI(`
    {
      Tags {
        items {
          name
        }
      }
    }
  `)
  return data?.Tags.items
}

export async function getAllPostsForHome(preview: any) {
  const data = await fetchAPI(
    `
    {
      PostItems(sort_by: "first_published_at:desc") {
        items {
          slug
          published_at
          first_published_at
          tag_list
          content {
            long_text
            intro
            title
            image
            author {
              name
              slug
              content
            }
          }
        }
      }
    }
  `,
    { preview }
  )
  return data?.PostItems.items
}

export async function getAllAuthorsForHome(preview: any) {
  const data = await fetchAPI(
    `
    {
      AuthorItems(sort_by: "first_published_at:desc") {
        items {
          name
          slug
          published_at
          content {
            picture {
              filename
            }
            description
          }
        }
      }
    }
  `,
    { preview }
  )
  return data?.AuthorItems.items
}

export async function getAuthor(slug:string, preview: any) {
  const uuids = await fetchAPI(`
  {
    AuthorItems(by_slugs: "authors/${slug}") {
      items {
        name
        slug
        uuid
      }
    }
  }  
  `,
    { preview }
  )

  return uuids.AuthorItems.items[0]
}

export async function getAllPostsForAuthor(uuid: string, preview: any) {
  const data = await fetchAPI(
`
  query PostWithAuthor($uuid: String) {
    PostItems(sort_by: "first_published_at:desc", filter_query_v2: {author: {in: $uuid}}) {
      items {
        slug
        published_at
        first_published_at
        tag_list
        content {
          long_text
          intro
          title
          image
          author {
            name
            slug
            content
          }
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        uuid: `${uuid}`,
      },
    }
  )
  return data?.PostItems.items
}

export async function getAuthorsWithSlug() {
  const data = await fetchAPI(`
    {
      AuthorItems {
        items {
          slug
        }
      }
    }
  `)
  return data?.AuthorItems.items
}

export async function getAllPostsForTag(tag: string, preview: any) {
  const data = await fetchAPI(
    `
    query PostWithTag($tag: String) {
      PostItems(sort_by: "first_published_at:desc",with_tag: $tag) {
        items {
          slug
          published_at
          first_published_at
          tag_list
          content {
            long_text
            intro
            title
            image
            author {
              name
              slug
              content
            }
          }
        }
      }
    }
  `,
    {
      preview,
      variables: {
        tag: `${tag}`,
      },
    }
  )
  return data?.PostItems.items
}

export async function getPostsForSinglePage(slug: string, preview: any) {
  const data = await fetchAPI(`
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
      published_at
      first_published_at
      id
      tag_list
      content {
        long_text
        intro
        title
        image
        author {
          name
          slug
          content
        }
      }
    }
    PostItems(per_page: 3, sort_by: "first_published_at:desc") {
      items {
        slug
        published_at
        first_published_at
        tag_list
        content {
          long_text
          intro
          title
          image
          author {
            name
            slug
            content
          }
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        slug: `posts/${slug}`,
      },
    }
  )

  const morePosts = (data?.PostItems?.items || [])
  .filter((item: any) => item.slug !== slug)
  .slice(0, 2) || []

  return {
    firstPost: data?.PostItem,
    morePosts: morePosts
  }
}
