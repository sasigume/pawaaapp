import fs from "fs"

import { Post } from '@/models/contentful/Post'
import { SITE_NAME, SITE_DESC } from '../constants'

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
<item>
    <guid>${process.env.HTTPS_URL}/${post.slug}/</guid>
    <title>${escapeString(post.title)}</title>
    <link>${process.env.HTTPS_URL}/${post.slug}/</link>
    <pubDate>${new Date(post.publishDate ?? post.sys.firstPublishedAt).toUTCString()}</pubDate>
    <summary>${post.description ?? "説明文なし"}</summary>
</item>
    `)
}


const generateRss = (posts: Post[]): string => {
  return (`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME}</title>
        <link>${process.env.HTTPS_URL}</link>
        <description>${SITE_DESC}</description>
        <atom:link href="${process.env.HTTPS_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${posts.map(generatePostItem).join('')}
    </channel>
</rss>
    `)
}
const publishRss = async (posts: Post[]) => {
  const PATH_DEVELOPINNG = './public/ignore/rss.xml'
  const PATH = './public/rss.xml'
  const rss = generateRss(posts)
  if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test") {
    fs.writeFileSync(PATH, rss)
    console.log('Updated RSS for production: ' + posts.length + ' posts writed')

  } else {
    fs.writeFileSync(PATH_DEVELOPINNG, rss)
    console.log('Updated RSS for development: ' + posts.length + ' posts writed')
  }

}

export default publishRss