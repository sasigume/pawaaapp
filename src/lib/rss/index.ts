import fs from "fs"

import { Post } from '@/models/contentful/Post'
import { Creator } from '@/models/contentful/Creator'
import { SITE_NAME, SITE_DESC } from '../constants'

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
    <title>${escapeString(creator.displayName)}</title>
    <link>${process.env.HTTPS_URL}/creators/${creator.slug}</link>
    <pubDate>${new Date(creator.sys.publishedAt ?? '').toUTCString()}</pubDate>
    <summary>${creator.description}</summary>
</item>
    `)
}

const generatePostItem = (post: Post): string => {
  return (`
<item>
    <guid>${process.env.HTTPS_URL}/posts/${post.slug}</guid>
    <title>${escapeString(post.displayName)}</title>
    <link>${process.env.HTTPS_URL}/posts/${post.slug}</link>
    <pubDate>${new Date(post.sys.publishedAt).toUTCString()}</pubDate>
    <summary>${post.intro}</summary>
</item>
    `)
}


const generateRss = (creators: Creator[], posts: Post[]): string => {
  console.log('Generating RSS for ' + posts.length + ' posts and ' + creators.length + ' creators!')
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