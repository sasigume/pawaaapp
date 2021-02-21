import fs from "fs"

import { Post } from '@/models/Post'
import { Creator } from '@/models/Creator'

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
    <title>${escapeString(creator.name)}</title>
    <lastmod>${new Date(creator.published_at ?? '').toUTCString()}</lastmod>
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