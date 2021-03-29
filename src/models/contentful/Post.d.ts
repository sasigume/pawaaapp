import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';
export interface PostBase {
  sys: Sys;
  title: string;
  slug: string;
  publishDate: string;
  heroImage?: {
    url: string;
  };
  person?: Person;
  description?: string;
  platformsCollection?: {
    items: Platform[];
  };
}

export interface Post extends PostBase {
  body: string;
  hideAdsense?: boolean;
}
