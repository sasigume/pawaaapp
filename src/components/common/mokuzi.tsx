import { Book } from "@/models/contentful/Book"
import { BookChapter } from "@/models/contentful/BookChapter"
import { Box, Button, Stack } from "@chakra-ui/react"
import LinkChakra from "./link-chakra"


interface Props {
  bookSlug?: string
  chapters?: BookChapter[]
  books?: Book[]
}

const Mokuzi = ({ bookSlug, chapters, books }: Props) => {
  return (<Stack aria-label="目次" direction="column" spacing={2}>
    <Box fontSize="2xl">目次</Box>
    {(chapters && chapters.length > 0 && bookSlug) && chapters.map(
      (c: BookChapter, n: number) =>
        <Button whiteSpace="normal" h="auto" p={2} lineHeight="tall" href={(`/books/${bookSlug}/chapters/${n + 1}`)} as={LinkChakra}>
          {c.title}
        </Button>
    )}
    {(books && books.length > 0) && books.map(
      (b: Book) =>
        <Button whiteSpace="normal" h="auto" p={2} lineHeight="tall" href={(`/books/${b.slug}`)} as={LinkChakra}>
          {b.title}
        </Button>
    )}
  </Stack>)
}

export default Mokuzi