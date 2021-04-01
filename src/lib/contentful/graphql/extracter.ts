import { Post, PostBase, PostForRss, PostOnlySlug } from '@/models/contentful/Post';
import { Person } from '@/models/contentful/Person';
import { Platform } from '@/models/contentful/Platform';

export function extractPerson(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items?.[0] as Person;
}

export function extractPersons(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items as Person[];
}
export function extractPlatform(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items?.[0] as Platform;
}

export function extractPlatforms(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items as Platform[];
}

export function extractPost(fetchResponse: any) {
  const fetchedPost = fetchResponse?.data?.blogPostCollection?.items?.[0];
  console.log(
    `Fetching: ${fetchedPost.slug}, firstPublishedAt: ${fetchedPost.sys.firstPublishedAt}`,
  );
  return fetchedPost as Post;
}
export function extractPostSlugs(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostOnlySlug[];
}
export function extractPostsForRss(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostForRss[];
}
export function extractPostBases(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostBase[];
}

export function extractPostBasesFromPerson(fetchResponse: any) {
  return fetchResponse?.data.personCollection?.items[0].linkedFrom.blogPostCollection
    ?.items as PostBase[];
}

export function extractPostBasesFromPlatform(fetchResponse: any) {
  console.log(fetchResponse);
  return fetchResponse?.data.platformCollection?.items[0].linkedFrom.blogPostCollection
    ?.items as PostBase[];
}
