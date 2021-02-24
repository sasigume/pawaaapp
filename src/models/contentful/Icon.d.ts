import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import {IconName,IconPrefix} from '@fortawesome/react-fontawesome'
import {Sys} from './Sys'

export interface Icon {
  sys: Sys
  name: IconName
  style: IconPrefix
}