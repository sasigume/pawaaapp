export default async function preview(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PREVIEW_TOKEN || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader('Set-Cookie')
  res.setHeader('Set-Cookie', cookies.map((cookie: any) => cookie.replace('SameSite=Lax', 'SameSite=None')))


  // Redirect to the entry location
  let slug = req.query.slug

  // Handle home slug 
  if (slug === 'home') {
    slug = ''
  }

  // Redirect to the path from entry
  res.redirect(`/${slug}`)

}