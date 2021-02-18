import Link from 'next/link'

interface Props {
  title: string;
  url: string;
  slug: string;
}

export default function CoverImageComponent({ title, url, slug }: Props) {
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>
            <img src={url} alt={title} />
          </a>
        </Link>
      ) : (
          <img src={url} alt={title} />
        )}
    </div>
  )
}
