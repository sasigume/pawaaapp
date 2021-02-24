import { NextApiResponse } from "next"
// https://github.com/vercel/next.js/blob/canary/examples/cms-contentful/pages/api/exit-preview.js
export default async function exit(_:any, res:NextApiResponse) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}