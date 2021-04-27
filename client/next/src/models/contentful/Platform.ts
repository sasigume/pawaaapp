import { Icon } from './Icon';
import { Sys } from './Sys';

export interface Platform {
  sys: Sys;
  displayName: string;
  slug: string;
  bgColor?: string; // for chakra UI
  description?: string | null;
  icon?: Icon | null;
}

export const PLATFORM_GRAPHQL_FIELDS = `
sys {
  id
  firstPublishedAt
  publishedAt
}
displayName
description
slug
bgColor
icon {
  name
  style
}
`;
