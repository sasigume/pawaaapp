import LinkChakra from '@/components/common/link-chakra'
import { Center } from '@chakra-ui/react'

interface Props {
  mode?: string;
  title: string;
  url: string;
  slug: string;
}

export default function BookImage({ mode, title, url, slug }: Props) {
  return (
    <Center w={mode == "single" ? "300px" : "100px"} h={mode == "single" ? "480px" : "160px"} rounded="xl" shadow="xl" overflow="hidden" bg="gray.300">
      {slug ? (
        <LinkChakra href={`/books/${slug}`}>
          <div className="flex items-center justify-center">
            <img className="mx-auto w-auto" src={url ? url : "/api/ogpgen/サムネイルがありません"} alt={title} />
          </div>
        </LinkChakra>
      ) : (
          <img className="mx-auto w-auto" src={"/api/ogpgen/記事が見つかりませんでした"} alt={title} />
        )}
    </Center>
  )
}
