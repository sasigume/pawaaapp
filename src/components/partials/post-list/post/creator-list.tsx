import Link from 'next/link'
import { Creator } from '@/models/contentful/Creator'

interface OneProps {
  creator: Creator
}
interface ListProps {
  creators: Creator[]
}

const OneCreator = ({ creator }: OneProps) => {

  return (
    <Link as={`/creators/${creator.slug}`} href="/creators/[slug]">
      <a className="block">
        <div className="flex items-center">
          <img
            src={creator.picture ? creator.picture.url : (process.env.HTTPS_URL + '/favicon.png')}
            className="w-12 h-12 rounded-full mr-4 grayscale"
            alt={creator.displayName ? creator.displayName : '(名前なし)'}
          />
          <div className="text-xl font-bold">{creator.displayName ? creator.displayName : '(名前なし)'}</div>
        </div>
      </a>
    </Link>
  )
}

const CreatorList = ({ creators }: ListProps) => {
  return (
    <div className="flex flex-wrap">
      {creators && creators.map((c: Creator) => <OneCreator creator={c} key={c.slug} />)}
    </div>
  )
}

export default CreatorList
