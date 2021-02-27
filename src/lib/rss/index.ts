import fs from "fs"

import { Post } from '@/models/contentful/Post'
import { Book } from '@/models/contentful/Book'
import { SITE_NAME, SITE_DESC } from '../constants'

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generateBookItem = (book: Book): string => {
  return (`
<item>
    <guid>${process.env.HTTPS_URL}/books/${book.slug}</guid>
    <title>${escapeString(book.title)}</title>
    <link>${process.env.HTTPS_URL}/books/${book.slug}</link>
    <pubDate>${new Date(book.sys.publishedAt ?? '').toUTCString()}</pubDate>
    <summary>${book.description}</summary>
</item>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<item>
    <guid>${process.env.HTTPS_URL}/posts/${post.slug}</guid>
    <title>${escapeString(post.displayName)}</title>
    <link>${process.env.HTTPS_URL}/posts/${post.slug}</link>
    <pubDate>${new Date(post.sys.publishedAt).toUTCString()}</pubDate>
    <summary>${post.intro}</summary>
</item>
    `)
}


const generateRss = (books: Book[], posts: Post[]): string => {
  console.log('Generating RSS for ' + posts.length + ' posts and ' + books.length + ' books!')
  return (`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME}</title>
        <link>${process.env.HTTPS_URL}</link>
        <description>${SITE_DESC}</description>
        <atom:link href="${process.env.HTTPS_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${books.map(generateBookItem).join('')}
        ${posts.map(generatePostItem).join('')}
    </channel>
</rss>
    `)
}
const publishRss = async (books: Book[], posts: Post[]) => {
  const PATH = './public/rss.xml'
  const rss = generateRss(books, posts)
  fs.writeFileSync(PATH, rss)
}

export default publishRss