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
    <a target="_blank" href={url} className="flex items-center w-40 text-white text-2xl block p-4 rounded-lg m-6 shadow-lg bg-blue-400">
      <div className="inline-block w-5"><FontAwesomeIcon icon={['fab', 'twitter']} /></div><div>ツイート</div>
    </a>
  )
}