import { BookChapter } from './BookChapter'
import { BookChapter } from './BookChapter';
import {Sys} from './Sys'

export interface Book {
  sys :Sys
  title: string
  slug: string
  description?: string
  coverImage?: {
    url: string
  }
  chaptersCollection: {
    items: BookChapter[]
  }
}