import { Sys } from './Sys';

export interface Creator {
  sys: Sys;
  displayName: string;
  slug: string;
  description?: string;
  picture: {
    url: string;
  };
}
