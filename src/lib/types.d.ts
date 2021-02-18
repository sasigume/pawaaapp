export interface Post {
  slug: string;
  first_published_at: string;
  published_at: string;
  md: string;
  content: {
    title: string;
    image: string;
    author: Author;
    intro: string;
  }
}

export interface HeroPostType {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  coverImage: string;
  slug: string;
}

export interface Author {
  name: string;
  picture: string;
}

export interface PostHeaderType {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
}