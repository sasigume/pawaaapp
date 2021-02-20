import Link from 'next/link'

interface Props {
  name: string;
  slug: string;
  src: string;
}

export default function Avatar({name,slug,src}:Props) {
  return (
    <Link as={`/authors/${slug}`} href="/authors/[slug]">
    <a className="block">
    <div className="flex items-center">
      <img
        src={src}
        className="w-12 h-12 rounded-full mr-4 grayscale"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
    </a>
    </Link>
  )
}
