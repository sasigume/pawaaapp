import { Person } from './Person';
import { Platform } from './Platform';
import { Sys } from './Sys';

export interface Post {
  sys: Sys;
  title: string;
  slug: string;
  publishDate?: string;
  description?: string;
  heroImage?: {
    url: string;
  };
  body: string;
  person?: Person;
  platformsCollection?: {
    items: Platform[];
  };
  hideAdsense?: boolean;
}
