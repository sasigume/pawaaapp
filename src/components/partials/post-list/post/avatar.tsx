import Link from 'next/link'
import {Creator} from '@/models/Creator'

export default function Avatar({slug,content}:Creator) {

  return (
    <Link as={`/creators/${slug}`} href="/creators/[slug]">
    <a className="block">
    <div className="flex items-center">
      <img
        src={content ? content.picture.filename : (process.env.HTTPS_URL + '/favicon.png')}
        className="w-12 h-12 rounded-full mr-4 grayscale"
        alt={content ? content.displayName : '(クリエイターが見つかりません)'}
      />
      <div className="text-xl font-bold">{content ? content.displayName : '(入力なし)'}</div>
    </div>
    </a>
    </Link>
  )
}
