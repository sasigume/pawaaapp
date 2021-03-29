import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';
export interface PostBase {
  sys: Sys;
  title: string;
  slug: string;
  publishDate?: string;
  heroImage?: {
    url: string;
  };
}

export interface Post extends PostBase {
  description?: string;
  body: string;
  person?: Person;
  platformsCollection?: {
    items: Platform[];
  };
  hideAdsense?: boolean;
}
