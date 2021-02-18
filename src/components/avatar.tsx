import { Author} from '@/lib/types'

export default function Avatar(author:Author) {
  return (
    <div className="flex items-center">
      <img
        src={author.picture}
        className="w-12 h-12 rounded-full mr-4 grayscale"
        alt={author.name}
      />
      <div className="text-xl font-bold">{author.name}</div>
    </div>
  )
}
