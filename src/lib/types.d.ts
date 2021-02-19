export interface Post {
  slug: string;
  first_published_at: string;
  published_at: string;
  content: Content;
  tag_list: string[]
}

interface Content {
  title: string;
  image: string;
  author: Author;
  intro: string;
  long_text: string;
}
export interface HeroPostType {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  coverImage: string;
  slug: string;
  tag_list: string[];
}

export interface Author {
  name: string;
  content:{
    picture: {
      filename: string;
    }
  }
}

export interface PostHeaderType {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
}