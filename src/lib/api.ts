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

export async function getPreviewPostBySlug(slug: string) {
  const post = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
    }
  }
  `,
    {
      preview: true,
      variables: {
        slug: `posts/${slug}`,
      },
    }
  )
  return post
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

export async function getTagPostsWithSlug() {
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

export async function getAllPostsForTag(tag: string, preview: any) {
  console.log(tag)
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

export async function getPostAndMorePosts(slug: string, preview: any) {
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

  return {
    post: data?.PostItem,
    morePosts: (data?.PostItems?.items || [])
      .filter((item: any) => item.slug !== slug)
      .slice(0, 2)
  }
}
