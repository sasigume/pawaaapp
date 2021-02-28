import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const word = req.query.word as string

  const secret = req.query.secret as string

  if (secret !== process.env.TWITTER_SECRET) {
    return res.status(401).json({ message: 'トークンが間違っています。' })
  }

  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
    headers: {
      "authorization": `Bearer ${process.env.TWITTER_BEARER}`
    }
  }

  const tweets = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${word}`, requestOptions)
  .then(response => {return response.text() as any})
  .catch(error => console.log('error', error));

  res.status(200).json(tweets)
}