import fs from "fs"

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


const generateRss = (books: Book[]): string => {
  return (`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME}</title>
        <link>${process.env.HTTPS_URL}</link>
        <description>${SITE_DESC}</description>
        <atom:link href="${process.env.HTTPS_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${books.map(generateBookItem).join('')}
    </channel>
</rss>
    `)
}
const publishRss = async (books: Book[]) => {
  const PATH = './public/rss.xml'
  const rss = generateRss(books)
  fs.writeFileSync(PATH, rss)
  console.log('Updated RSS: ' + books.length + ' books writed')
}

export default publishRss