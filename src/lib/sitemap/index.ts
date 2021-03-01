import fs from "fs"

import { Book } from '@/models/contentful/Book'

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
<url>
    <loc>${process.env.HTTPS_URL}/books/${book.slug}</loc>
    <title>${escapeString(book.title)}</title>
    <lastmod>${new Date(book.sys.publishedAt ?? '').toUTCString()}</lastmod>
</url>
    `)
}


const generateSitemap = (books: Book[]): string => {
  return (`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${books.map(generateBookItem).join('')}
</urlset>
    `)
}
const publishSitemap = async (books: Book[]) => {
  const PATH = './public/sitemap.xml'
  const rss = generateSitemap(books)
  fs.writeFileSync(PATH, rss)
}

export default publishSitemap