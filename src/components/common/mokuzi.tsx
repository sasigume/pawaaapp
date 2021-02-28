import { BookChapter } from "@/models/contentful/BookChapter"
import { Box, Button, Stack } from "@chakra-ui/react"
import LinkChakra from "./link-chakra"


interface Props {
  bookSlug: string
  list: BookChapter[]
}

const Mokuzi = ({bookSlug,list}:Props) => {
  return (<Stack direction="column" spacing={2}>
    <Box fontSize="2xl">目次</Box>
    {list.map(
      (c:BookChapter, n:number) => 
        <Button whiteSpace="normal" h="auto" p={2} lineHeight="tall" href={(`/books/${bookSlug}/chapters/${n + 1}`)} as={LinkChakra}>
        {c.title}
        </Button>
    )}
  </Stack>)
}

export default Mokuzi