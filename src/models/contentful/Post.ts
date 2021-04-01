import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';

import { PERSON_GRAPHQL_FIELDS } from './Person';
import { PLATFORM_GRAPHQL_FIELDS } from './Platform';

export interface PostOnlySlug {
  slug: string;
}

export interface PostForList extends PostOnlySlug {
  sys: Sys;
  title: string;
  publishDate: string;
}

export interface PostForRss extends PostOnlySlug {
  sys: Sys;
  title: string;
  publishDate: string;
  person?: Person;
  description?: string;
}
export interface PostBase extends PostForRss {
  heroImage?: {
    url: string;
  };
  platformsCollection?: {
    items: Platform[];
  };
}

export interface Post extends PostBase {
  body: string;
  hideAdsense?: boolean;
}

export const POSTFORLIST_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
title
slug
publishDate
`;

export const POSTFORRSS_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
title
slug
publishDate
person {
  ${PERSON_GRAPHQL_FIELDS}
}
description
`;

export const POSTBASE_GRAPHQL_FIELDS =
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
`;

export const POST_GRAPHQL_FIELDS =
  POSTBASE_GRAPHQL_FIELDS +
  `
body
hideAdsense`;
