import { NextApiRequest, NextApiResponse } from 'next';

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.query.secret as string;
  const slug = req.query.slug as string;
  const exit = req.query.exit as string;

  if (exit == 'yes') {
    res.clearPreviewData();
    res.writeHead(307, { Location: '/' });
    res.end();
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  let post = undefined;

  const postRes = await fetch(`${process.env.API_URL}/contentful-getPreviewPost?slug=${slug}`, {
    headers: {
      authorization: process.env.FUNCTION_AUTH ?? '',
    },
  });
  if (postRes.ok) {
    post = await postRes.json();
  }

  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({});

  const url = `/${post.slug}`;
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
  );
  res.end();
}
