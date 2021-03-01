import LinkChakra from '@/components/common/link-chakra'
import { Center } from '@chakra-ui/react'

interface Props {
  mode?: string;
  title: string;
  url: string;
  slug: string;
}

export default function BookImage({ mode, title, url, slug }: Props) {
  let baseW, baseH, mdW, mdH
  if (mode == "single") {
    baseW = 150
    baseH = 240
    mdW = 300
    mdH = 480
  } else {
    baseW = 100
    baseH = 160
    mdW = 150
    mdH = 240
  }
  return (
    <Center>
      <Center w={{ base: baseW, md: mdW }} h={{ base: baseH, md: mdH }} rounded="xl" shadow="xl" overflow="hidden" bg="gray.300">
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
    </Center>
  )
}
