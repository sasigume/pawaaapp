import fs from "fs"

import { Author, Post } from './types'

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generateProfileItem = (author: Author): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/authors/${author.slug}</loc>
    <title>${escapeString(author.name)}</title>
    <lastmod>${new Date(author.published_at ?? '').toUTCString()}</lastmod>
</url>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/posts/${post.slug}</loc>
    <title>${escapeString(post.content.title)}</title>
    <lastmod>${new Date(post.published_at).toUTCString()}</lastmod>
</url>
    `)
}


const generateSitemap = (authors: Author[], posts: Post[]): string => {
  return (`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${authors.map(generateProfileItem).join('')}
        ${posts.map(generatePostItem).join('')}
</urlset>
    `)
}
const publishSitemap = async (authors: Author[], posts: Post[]) => {
  const PATH = './public/sitemap.xml'
  const rss = generateSitemap(authors, posts)
  fs.writeFileSync(PATH, rss)
}

export default publishSitemap