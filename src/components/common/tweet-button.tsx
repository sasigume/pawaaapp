import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  url: string
  text: string
}

export default function TweetButton(props: Props) {
  const url = `https://twitter.com/share?url=${encodeURIComponent(
    props.url
  )}&text=${encodeURIComponent(props.text)}&hashtags=PAWAAAPP`

  return (
    <a href={url} className="w-40 text-white text-2xl block p-4 rounded-lg m-6 shadow-lg bg-blue-400">
      <span className="inline-block w-5"><FontAwesomeIcon icon={['fab', 'twitter']} /></span> ツイート
    </a>
  )
}