import fs from "fs"

import { Author, Post } from './types'
import { SITE_NAME, SITE_URL, SITE_DESC } from './constants'

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
<item>
    <guid>${SITE_URL}/authors/${author.slug}</guid>
    <title>${escapeString(author.name)}</title>
    <link>${SITE_URL}/authors/${author.slug}</link>
    <pubDate>${author.published_at}</pubDate>
</item>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<item>
    <guid>${SITE_URL}/posts/${post.slug}</guid>
    <title>${escapeString(post.content.title)}</title>
    <link>${SITE_URL}/posts/${post.slug}</link>
    <pubDate>${post.published_at}</pubDate>
    <summary>${post.content.intro}</summary>
</item>
    `)
}


const generateRss = (authors: Author[], posts: Post[]): string => {
  return (`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME}</title>
        <link>${SITE_URL}</link>
        <description>${SITE_DESC}</description>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${authors.map(generateProfileItem).join('')}
        ${posts.map(generatePostItem).join('')}
    </channel>
</rss>
    `)
}
const publishRss = async (authors: Author[], posts: Post[]) => {
  const PATH = './public/rss.xml'
  const rss = generateRss(authors, posts)
  fs.writeFileSync(PATH, rss)
}

export default publishRss