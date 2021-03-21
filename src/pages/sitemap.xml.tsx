// https://zenn.dev/catnose99/articles/c441954a987c24

import { SITE_FULL_URL } from '@/lib/constants'
import { getAllPostsWithSlug } from '@/lib/contentful/graphql'
import { GetServerSidePropsContext } from 'next'

const TOTAL_LIMIT = parseInt(process.env.TOTAL_PAGINATION ?? '600')

async function generateSitemapXml():Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  
  const posts = await getAllPostsWithSlug(false,TOTAL_LIMIT) ?? []
  posts.forEach((post) =>{
    xml += `
      <url>
        <loc>${SITE_FULL_URL}/${post.slug}/</loc>
        <lastmod>${post.sys.publishedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
  })
  
  xml += `</urlset>`
  return xml
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {}
  }
}

const Page = () => null
export default Page