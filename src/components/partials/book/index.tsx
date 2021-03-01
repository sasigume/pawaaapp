import { SingleBookComponent } from './single-book'
import { BookComponent } from './single-book'
import { Book } from '@/models/contentful/Book'
import { Box, Center, Container, Divider, Flex, SimpleGrid, Stack } from '@chakra-ui/react'

interface MultiBookProps {
  books: Book[];
  mode?: string;
}
const MultiBooks = ({ books, mode }: MultiBookProps) => {
  if (mode == "archive") {
    const moreBooks = books.slice(1)
    return (
      <section>
        <Center flexDirection="column">
          <Container maxW="container.md" mt={10}>
            <SingleBookComponent
              book={books[0]}
              expand={false}
              mokuji={false}
            />
          </Container>
          <Divider my={8} borderColor="gray.400" />
          <SimpleGrid spacing={4} columns={{ base: 1, lg: 2 }}>
            {moreBooks.map((book: Book) => (
              <BookComponent
                key={book.slug}
                book={book}
                expand={false}
              />
            ))}
          </SimpleGrid>
        </Center>
      </section>
    )
  }
  else {
    return (
      <Box>
        {mode == "more" && (<Box textStyle="h2">
          <h2>他の本</h2>
        </Box>)}
        <Center>
          <SimpleGrid columns={{ base: 1, lg: 2 }}>
            {books.map((book) => (
              <BookComponent
                key={book.slug}
                book={book}
                expand={false}
              />
            ))}
          </SimpleGrid>
        </Center>
      </Box>
    )
  }
}

interface BookListProps {
  books: Book[];
  mode?: string;
  expand?: boolean;
}

export const BookList = ({ books, mode, expand }: BookListProps) => {
  if (mode == "single") {
    return (
      <SingleBookComponent
        book={books[0]}
        expand={expand ?? false}
      />
    )
  } else {
    return (
      <MultiBooks mode={mode} books={books} />
    )
  }
}

export default BookList
