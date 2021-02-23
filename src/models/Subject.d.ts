import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'

interface Icon {
  style: IconPrefix;
  name: IconName;
}
export interface Subject {
  slug: string;
  uuid: string;
  content: {
    displayName: string;
    bgColor? : string; // hex
    picture: {
      filename: string;
    }
    desctiption: string;
    icon?: Icon[]
  }
}