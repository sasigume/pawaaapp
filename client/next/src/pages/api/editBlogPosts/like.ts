import { NextApiRequest, NextApiResponse } from 'next';

export default async function dislike(request: NextApiRequest, response: NextApiResponse) {
  const slug = request.query.slug as string | undefined;

  if (!slug) {
    response.status(500).json({
      error: `Slug is invalid`,
    });
  } else {
    if (slug == '') {
      response.status(500).json({
        error: `Slug is blank`,
      });
    } else {
      await fetch(process.env.API_URL + '/editBlogPosts-like?slug=' + slug, {
        headers: {
          Authorization: process.env.FUNCTION_AUTH ?? '',
        },
      })
        .then((res) => {
          response.status(res.status).json({
            message: `Liked ${slug}`,
          });
        })
        .catch((e) => {
          response.status(500).json({
            error: `${e}`,
          });
        });
    }
  }
}
