import LinkChakra from '@/components/common/link-chakra'
import { BookChapter } from '@/models/contentful/BookChapter'
import { Badge, Box, Flex } from '@chakra-ui/react'

interface Props {
  bookChapter: BookChapter
  bookSlug: string;
  num: number
}

interface ListProps {
  bookChapters: BookChapter[]
  bookSlug: string
}


const OneBookChapter = ({ bookChapter, bookSlug, num }: Props) => {
  return (
    <LinkChakra href={(`/books/${bookSlug}/chapters/${num + 1}`)}>

      <Badge colorScheme="green">CHAPTER {num + 1}</Badge>
      <Box textStyle="h4"><h2>{bookChapter.title}</h2></Box>
      <div>{bookChapter.description ?? '説明文がありません'}</div>

    </LinkChakra>
  )
}

const BookChapterList = ({ bookChapters, bookSlug }: ListProps) => {
  return (
    <Flex direction="column">
      {bookChapters.map((c: BookChapter, num: number, arr: any) => {
        // if it's last chapter
        if (arr.length - 1 === num) {
          return (<Box mb={4} p={3} pt={0}>
            <OneBookChapter bookSlug={bookSlug} bookChapter={c} key={c.title} num={num} />
          </Box>)
        } else {
          return (<Box mb={4} p={3} borderBlockEnd="solid" borderBlockEndColor="gray.100">
            <OneBookChapter bookSlug={bookSlug} bookChapter={c} key={c.title} num={num} />
          </Box>)
        }
      }
      )}
    </Flex>
  )
}

export default BookChapterList