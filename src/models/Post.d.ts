import {Creator} from './Creator'
import {Subject} from './Subject'

export interface Post {
  slug: string;
  first_published_at: string;
  published_at: string;
  content: Content;
}

interface Content {
  title: string;
  image: string;
  subjects: Subject[]
  creator: Creator;
  intro: string;
  long_text: string;
}
export interface PostComponentType extends Post {
  mode?: string;
}