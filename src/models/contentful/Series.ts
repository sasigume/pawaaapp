import { Post, POSTFORLIST_GRAPHQL_FIELDS } from './Post';

export interface Series {
  slug: string;
  postsCollection: {
    items: Post[];
  };
}

export const SERIES_GRAPHQL_FIELDS = `
slug
postsCollection {
  items{
    ${POSTFORLIST_GRAPHQL_FIELDS}
  }
}`;
