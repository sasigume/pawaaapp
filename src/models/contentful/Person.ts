import { Sys } from './Sys';

export interface Person {
  sys: Sys;
  displayName: string;
  slug: string;
  description?: string;
  picture: {
    url: string;
  };
}

export const PERSON_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
displayName
description
slug
picture {
  url
}
`;
