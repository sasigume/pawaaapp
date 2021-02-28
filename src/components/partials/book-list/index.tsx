import { SingleBookComponent } from './book'
import { BookComponent } from './book'
import { Book } from '@/models/contentful/Book'
import { Box, Stack } from '@chakra-ui/react'

interface MultiBookProps {
  books: Book[];
  mode?: string;
}
const MultiBooks = ({ books, mode }: MultiBookProps) => {
  if (mode == "archive") {
    const moreBooks = books.slice(1)
    return (
      <section>
        <BookComponent
          key={books[0].slug}
          book={books[0]}
          expand={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
          {moreBooks.map((book: Book) => (
            <BookComponent
              key={book.slug}
              book={book}
              expand={false}
            />
          ))}
        </div>
      </section>
    )
  }
  else {
    return (
      <section>
        {mode == "more" && (<Box textStyle="h2">
          <h2>他の本</h2>
        </Box>)}
        <Stack>
          {books.map((book) => (
            <BookComponent
              key={book.slug}
              book={book}
              expand={false}
            />
          ))}
        </Stack>
      </section>
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
