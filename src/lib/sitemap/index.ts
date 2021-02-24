import fs from "fs"

import { Post } from '@/models/contentful/Post'
import { Creator } from '@/models/contentful/Creator'

const escapeString = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const generateProfileItem = (creator: Creator): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/creators/${creator.slug}</loc>
    <title>${escapeString(creator.displayName)}</title>
    <lastmod>${new Date(creator.sys.publishedAt ?? '').toUTCString()}</lastmod>
</url>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<url>
    <loc>${process.env.HTTPS_URL}/posts/${post.slug}</loc>
    <title>${escapeString(post.displayName)}</title>
    <lastmod>${new Date(post.sys.publishedAt).toUTCString()}</lastmod>
</url>
    `)
}


const generateSitemap = (creators: Creator[], posts: Post[]): string => {
  return (`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${creators.map(generateProfileItem).join('')}
        ${posts.map(generatePostItem).join('')}
</urlset>
    `)
}
const publishSitemap = async (creators: Creator[], posts: Post[]) => {
  const PATH = './public/sitemap.xml'
  const rss = generateSitemap(creators, posts)
  fs.writeFileSync(PATH, rss)
}

export default publishSitemap