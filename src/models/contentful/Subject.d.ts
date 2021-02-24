import { Icon } from './Icon'

export interface Subject {
  sys: Sys
  displayName: string
  slug: string
  bgColor?: string
  description?: string
  icon?: Icon
}