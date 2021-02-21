import fs from "fs"

import { Post } from '@/models/Post'
import { Creator } from '@/models/Creator'
import { SITE_NAME, SITE_DESC } from './constants'

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
<item>
    <guid>${process.env.HTTPS_URL}/creators/${creator.slug}</guid>
    <title>${escapeString(creator.name)}</title>
    <link>${process.env.HTTPS_URL}/creators/${creator.slug}</link>
    <pubDate>${new Date(creator.published_at ?? '').toUTCString()}</pubDate>
    <summary>${creator.content.description}</summary>
</item>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<item>
    <guid>${process.env.HTTPS_URL}/posts/${post.slug}</guid>
    <title>${escapeString(post.content.title)}</title>
    <link>${process.env.HTTPS_URL}/posts/${post.slug}</link>
    <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
    <summary>${post.content.intro}</summary>
</item>
    `)
}


const generateRss = (creators: Creator[], posts: Post[]): string => {
  return (`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${SITE_NAME}</title>
        <link>${process.env.HTTPS_URL}</link>
        <description>${SITE_DESC}</description>
        <atom:link href="${process.env.HTTPS_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${creators.map(generateProfileItem).join('')}
        ${posts.map(generatePostItem).join('')}
    </channel>
</rss>
    `)
}
const publishRss = async (creators: Creator[], posts: Post[]) => {
  const PATH = './public/rss.xml'
  const rss = generateRss(creators, posts)
  fs.writeFileSync(PATH, rss)
}

export default publishRss