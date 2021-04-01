import { Post, PostForList, PostForRss, PostOnlySlug } from '@/models/contentful/Post';
import { Person } from '@/models/contentful/Person';
import { Platform } from '@/models/contentful/Platform';
import { Series } from '@/models/contentful/Series';

export function extractPerson(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items?.[0] as Person;
}

export function extractPersons(fetchResponse: any) {
  return fetchResponse?.data?.personCollection?.items as Person[];
}
export function extractSeries(fetchResponse: any) {
  console.log(`Fetched series: ${fetchResponse?.data.seriesCollection?.items?.[0]}`);
  return fetchResponse?.data.seriesCollection?.items?.[0] as Series;
}
export function extractPlatform(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items?.[0] as Platform;
}

export function extractPlatforms(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items as Platform[];
}

export function extractPost(fetchResponse: any) {
  const fetchedPost = fetchResponse?.data?.blogPostCollection?.items?.[0] as Post;
  console.log(
    `Fetching: ${fetchedPost.slug}, PublishDate for sorting: ${
      fetchedPost.publishDate ?? 'not set'
    }`,
  );
  return fetchedPost;
}
export function extractPostSlugs(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostOnlySlug[];
}
export function extractPostForLists(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostForList[];
}
export function extractPostsForRss(fetchResponse: any) {
  return fetchResponse?.data?.blogPostCollection?.items as PostForRss[];
}

export function extractPostForListsFromPerson(fetchResponse: any) {
  return fetchResponse?.data.personCollection?.items[0].linkedFrom.blogPostCollection
    ?.items as PostForList[];
}

export function extractPostForListsFromPlatform(fetchResponse: any) {
  return fetchResponse?.data.platformCollection?.items[0].linkedFrom.blogPostCollection
    ?.items as PostForList[];
}
