import Link from 'next/link'
import {Author} from '@/lib/types'

export default function Avatar({name,slug,content}:Author) {
  return (
    <Link as={`/authors/${slug}`} href="/authors/[slug]">
    <a className="block">
    <div className="flex items-center">
      <img
        src={content.picture.filename}
        className="w-12 h-12 rounded-full mr-4 grayscale"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
    </a>
    </Link>
  )
}
