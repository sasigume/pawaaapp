export interface Post {
  slug: string;
  first_published_at: string;
  published_at: string;
  content: Content;
  tag_list?: string[]
}

interface Content {
  title: string;
  image: string;
  author: Author;
  intro: string;
  long_text: string;
}
export interface PostComponentType extends Post {
  mode?: string;
}

export interface Author {
  name: string;
  slug: string;
  published_at?: string;
  content:{
    picture: {
      filename: string;
    }
    description :string;
  }
}

export interface PostHeaderType {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
}