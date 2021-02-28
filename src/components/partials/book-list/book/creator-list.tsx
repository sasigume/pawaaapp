import LinkChakra from '@/components/common/link-chakra'
import { Creator } from '@/models/contentful/Creator'

interface OneProps {
  creator: Creator
}
interface ListProps {
  creators: Creator[]
}

const OneCreator = ({ creator }: OneProps) => {

  return (
    <LinkChakra href={`/creators/${creator.slug}`}>
      <div className="block">
        <div className="flex items-center">
          <img
            src={creator.picture ? creator.picture.url : (process.env.HTTPS_URL + '/favicon.png')}
            className="w-12 h-12 rounded-full mr-4 grayscale"
            alt={creator.displayName ? creator.displayName : '(名前なし)'}
          />
          <div className="text-xl font-bold">{creator.displayName ? creator.displayName : '(名前なし)'}</div>
        </div>
      </div>
    </LinkChakra>
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
