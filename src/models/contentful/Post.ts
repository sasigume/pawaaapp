import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';

import { PERSON_GRAPHQL_FIELDS } from './Person';
import { PLATFORM_GRAPHQL_FIELDS } from './Platform';

export interface PostOnlySlug {
  slug: string;
}

interface PostInfo extends PostOnlySlug {
  sys: Sys;
  title: string;
  publishDate: string;
}
const postInfoQuery = `
sys {
  id
  firstPublishedAt
  publishedAt
}
title
slug
publishDate
`;

export interface PostForList extends PostInfo {
  heroImage?: {
    url: string;
  };
}
export const POSTFORLIST_GRAPHQL_FIELDS =
  postInfoQuery +
  `
heroImage {
  url
}
`;

export interface PostForRss extends PostInfo {
  person?: Person;
  description?: string;
}
export const POSTFORRSS_GRAPHQL_FIELDS =
  postInfoQuery +
  `
person {
  ${PERSON_GRAPHQL_FIELDS}
}
description
`;

export interface Post extends PostForRss {
  heroImage?: {
    url: string;
  };
  platformsCollection?: {
    items: Platform[];
  };
  body: string;
  hideAdsense?: boolean;
  like?: number;
  dislike?: number;
  tweetCount?: number;
}
export const POST_GRAPHQL_FIELDS =
  POSTFORRSS_GRAPHQL_FIELDS +
  `
heroImage {
  url
}
platformsCollection(limit: 5) {
  items {
    ${PLATFORM_GRAPHQL_FIELDS}
  }
}
body
hideAdsense`;
