import Link from 'next/link'

interface Props {
  title: string;
  url: string;
  slug: string;
}

export default function CoverImageComponent({ title, url, slug }: Props) {
  return (
    <div className="">
      {slug ? (
        <Link as={`/books/${slug}`} href="/books/[slug]">
          <a aria-label={title} className="flex items-center sm:mx-0 max-h-48 relative overflow-hidden">
            <img className="mx-auto w-auto" src={url} alt={title} />
          </a>
        </Link>
      ) : (
          <img className="mx-auto w-auto" src={url} alt={title} />
        )}
    </div>
  )
}
