import {fetchAPI} from './api'


export async function getSubjectsWithSlug() {
  const data = await fetchAPI(`
    {
      SubjectItems {
        items {
          slug
        }
      }
    }
  `)
  return data?.SubjectItems.items
}

export async function getSubject(slug:string, preview: any) {
  const subjects = await fetchAPI(`
  {
    SubjectItems(by_slugs: "subjects/${slug}") {
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
    { preview }
  )

  return subjects.SubjectItems.items[0]
}

export async function getAllPostsForSubject(uuid: string, preview: any) {
  const data = await fetchAPI(
    `
    query PostWithSubject($uuid: String) {
      PostItems(sort_by: "first_published_at:desc",filter_query_v2: {subjects: {all_in_array: [$uuid]}}) {
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
    }
  )
  return data?.PostItems.items
}