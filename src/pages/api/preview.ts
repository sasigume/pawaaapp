import { getPreviewBook } from '@/lib/contentful/graphql'
import { NextApiRequest, NextApiResponse } from 'next'

// https://github.com/vercel/next.js/blob/canary/examples/cms-contentful/pages/api/preview.js

export default async function preview(req:NextApiRequest, res:NextApiResponse) {
  const secret = req.query.secret as string
  const slug = req.query.slug as string

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'トークンかスラッグの少なくとも一つが間違っています。' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const book = await getPreviewBook(slug)

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!book) {
    return res.status(401).json({ message: '本が見つかりません。' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/posts/${post.slug}` })
  const url = `/books/${book.slug}`
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
  )
  res.end()
}