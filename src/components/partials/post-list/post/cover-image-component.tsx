import LinkChakra from '@/components/common/link-chakra'

interface Props {
  title: string;
  url: string;
  slug: string;
}

export default function CoverImageComponent({ title, url, slug }: Props) {
  return (
    <div className="">
      {slug ? (
        <LinkChakra href={`/posts/${slug}`}>
          <div aria-label={title} className="flex items-center sm:mx-0 max-h-48 relative overflow-hidden">
            <img className="mx-auto w-auto" src={url} alt={title} />
          </div>
        </LinkChakra>
      ) : (
          <img className="mx-auto w-auto" src={url} alt={title} />
        )}
    </div>
  )
}
