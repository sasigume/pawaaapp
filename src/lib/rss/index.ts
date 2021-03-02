import fs from "fs"

import { Book } from '@/models/contentful/Book'
import { SITE_NAME, SITE_DESC } from '../constants'
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
<item>
    <guid>${process.env.HTTPS_URL}/books/${book.slug}/chapters/${num + 1}</guid>
    <title>${escapeString(chapter.title)} | ${book.title}</title>
    <guid>${process.env.HTTPS_URL}/books/${book.slug}/chapters/${num + 1}</guid>
    <pubDate>${new Date(chapter.sys.publishedAt ?? '').toUTCString()}</pubDate>
    <summary>${chapter.description ?? '説明文なし'}</summary>
</item>
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
<item>
    <guid>${process.env.HTTPS_URL}/books/${book.slug}</guid>
    <title>${escapeString(book.title)}</title>
    <link>${process.env.HTTPS_URL}/books/${book.slug}</link>
    <pubDate>${new Date(book.sys.publishedAt ?? '').toUTCString()}</pubDate>
    <summary>${book.description ?? "説明文なし"}</summary>
</item>
${chapters.length > 0 && chapters.join('')}
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