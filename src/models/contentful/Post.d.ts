import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';

export interface PostOnlySlug {
  slug: string;
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
