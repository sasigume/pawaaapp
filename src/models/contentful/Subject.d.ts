import { Icon } from './Icon';

export interface Subject {
  sys: Sys;
  displayName: string;
  slug: string;
  bgColor?: string; // for chakra UI
  description?: string;
  icon?: Icon;
}
