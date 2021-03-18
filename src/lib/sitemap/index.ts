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
    <loc>${process.env.HTTPS_URL}/${post.slug}/</loc>
    <title>${escapeString(post.title)}</title>
    <lastmod>${new Date(post.sys.publishedAt).toUTCString()}</lastmod>
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

  const PATH = 'public/sitemap.xml'
  const PATH_DEVELOPINNG = 'public/ignore/sitemap.xml'
  const sitemap = generateSitemap(posts)
  if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test") {
    fs.writeFileSync(PATH, sitemap)
    console.log('Updated sitemap for production: ' + posts.length + ' posts writed')
  } else {
    fs.writeFileSync(PATH_DEVELOPINNG, sitemap)
    console.log('Updated sitemap for development: ' + posts.length + ' posts writed')
  }
}

export default publishSitemap