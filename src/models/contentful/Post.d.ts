import { Author } from './Author';
import {Sys} from './Sys'

export interface Post {
  sys :Sys
  title: string
  slug: string
  description?: string
  heroImage?: {
    url: string
  }
  body: string
  author?: Author
}