import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { Sys } from './Sys';

export interface Icon {
  sys: Sys;
  name: IconName;
  style: IconPrefix;
}
