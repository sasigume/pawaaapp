import fs from "fs"

import { Post } from '@/models/contentful/Post'

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generatePostItem = (post: Post): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/${post.slug}</loc>
    <title>${escapeString(post.title)}</title>
    <lastmod>${new Date(post.sys.publishedAt ?? '').toUTCString()}</lastmod>
</url>
    `)
}


const generateSitemap = (posts: Post[]): string => {
  return (`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map(generatePostItem).join('')}
</urlset>
    `)
}
const publishSitemap = async (posts: Post[]) => {
  const PATH = './public/sitemap.xml'
  const rss = generateSitemap(posts)
  fs.writeFileSync(PATH, rss)
}

export default publishSitemap