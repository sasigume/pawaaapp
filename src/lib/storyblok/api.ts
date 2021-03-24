export async function fetchAPI(query: any, { variables, preview }: any = {}) {
  let token;
  preview
    ? (token = process.env.STORYBLOK_PREVIEW_TOKEN)
    : (token = process.env.STORYBLOK_PUBLIC_TOKEN);

  const headerOption = {
    'Content-Type': 'application/json',
    Token: token ?? '',
    Version: preview ? 'draft' : 'published',
  };
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: headerOption,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
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
  `);
  return data?.PostItems.items;
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
          content {
            long_text
            intro
            title
            image
            creator {
              slug
              content
            }
          }
        }
      }
    }
  `,
    { preview },
  );
  return data?.PostItems.items;
}

export async function getAllCreatorsForHome(preview: any) {
  const data = await fetchAPI(
    `
    {
      CreatorItems(sort_by: "first_published_at:desc") {
        items {
          slug
          published_at
          content {
            displayName
            picture {
              filename
            }
            description
          }
        }
      }
    }
  `,
    { preview },
  );
  return data?.CreatorItems.items;
}

export async function getCreator(slug: string, preview: any) {
  const uuids = await fetchAPI(
    `
  {
    CreatorItems(by_slugs: "creators/${slug}") {
      items {
        slug
        uuid
        content {
          displayName
        }
      }
    }
  }  
  `,
    { preview },
  );

  return uuids.CreatorItems.items[0];
}

export async function getAllPostsForCreator(uuid: string, preview: any) {
  const data = await fetchAPI(
    `
  query PostWithCreator($uuid: String) {
    PostItems(sort_by: "first_published_at:desc", filter_query_v2: {creator: {in: $uuid}}) {
      items {
        slug
        published_at
        first_published_at
        content {
          long_text
          intro
          title
          image
          subjects {
            slug
            content
          }
          creator {
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
    },
  );
  return data?.PostItems.items;
}

export async function getCreatorsWithSlug() {
  const data = await fetchAPI(`
    {
      CreatorItems {
        items {
          slug
        }
      }
    }
  `);
  return data?.CreatorItems.items;
}

export async function getPostsForSinglePage(slug: string, preview: any) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: ID!) {
    PostItem(id: $slug) {
      slug
      published_at
      first_published_at
      id
      content {
        long_text
        intro
        title
        image
        subjects {
          slug
          content
        }
        creator {
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
        content {
          long_text
          intro
          title
          image
          subjects {
            slug
            content
          }
          creator {
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
    },
  );

  const morePosts =
    (data?.PostItems?.items || []).filter((item: any) => item.slug !== slug).slice(0, 2) || [];

  return {
    firstPost: data?.PostItem,
    morePosts: morePosts,
  };
}
