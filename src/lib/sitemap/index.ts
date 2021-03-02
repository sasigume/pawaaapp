import fs from "fs"

import { Book } from '@/models/contentful/Book'
import { BookChapter } from "@/models/contentful/BookChapter";

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generateChapterItem = (book: Book, chapter: BookChapter, num: number): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/books/${book.slug}/chapters/${num + 1}</loc>
    <title>${escapeString(chapter.title)} | ${book.title}</title>
    <lastmod>${new Date(chapter.sys.publishedAt ?? '').toUTCString()}</lastmod>
</url>
    `)
}

const generateBookItem = (book: Book): string => {
  let chapters: string[] = []
  if (book.chaptersCollection.items && book.chaptersCollection.items.length > 0) {
    chapters = book.chaptersCollection.items.map(
      (c: BookChapter, n: number) => generateChapterItem(book, c, n)
    )
  }
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/books/${book.slug}</loc>
    <title>${escapeString(book.title)}</title>
    <lastmod>${new Date(book.sys.publishedAt ?? '').toUTCString()}</lastmod>
</url>
${chapters.length > 0 && chapters.join('')}
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