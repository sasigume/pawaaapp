import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (
      req.query.secret !== process.env.MY_SECRET_TOKEN ||
      !req.query.slug
    ) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})

    // Set cookie to None, so it can be read in the Storyblok iframe
    const cookies = res.getHeader('Set-Cookie')
    res.setHeader('Set-Cookie', cookies.map((cookie:any) => cookie.replace('SameSite=Lax', 'SameSite=None')))


    // Redirect to the entry location
    let slug = req.query.slug

    // Handle home slug 
    if(slug === 'home') {
        slug = ''
    }
  
    // Redirect to the path from entry
    res.redirect(`/posts/${slug}`)
  }