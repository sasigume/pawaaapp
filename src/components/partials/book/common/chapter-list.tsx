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

      <Badge mb={2} colorScheme="green">CHAPTER {num + 1}</Badge>
      <Box textStyle="h4"><h2>{bookChapter.title}</h2></Box>
      <Box pt={3}>{bookChapter.description ?? '説明文がありません'}</Box>

    </LinkChakra>
  )
}

const BookChapterList = ({ bookChapters, bookSlug }: ListProps) => {
  return (
    <Flex direction="column">
      {bookChapters.map((c: BookChapter, num: number, arr: any) => {
        // if it's last chapter
        if (arr.length - 1 === num) {
          return (<Box mb={4} p={2} pb={0} key={c.title}>
            <OneBookChapter bookSlug={bookSlug} bookChapter={c} num={num} />
          </Box>)
        } else {
          return (<Box mb={4} p={2} pb={5} key={c.title} borderBlockEnd="solid" borderBlockEndColor="gray.100">
            <OneBookChapter bookSlug={bookSlug} bookChapter={c} num={num} />
          </Box>)
        }
      }
      )}
    </Flex>
  )
}

export default BookChapterList