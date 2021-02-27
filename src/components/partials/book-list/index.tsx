import {SingleBookComponent} from './book'
import {BookComponent} from './book'
import { Book } from '@/models/contentful/Book'

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
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
          {moreBooks.map((book:Book) => (
            <BookComponent
              key={book.slug}
              book={book}
            />
          ))}
        </div>
      </section>
    )
  }
  else {
    return (
      <section>
        {mode == "more" && <h2 className="mb-8 text-3xl md:text-4xl font-bold">他の本</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:gap-x-16 gap-y-16 md:gap-x-24 mb-16">
          {books.map((book) => (
            <BookComponent
              key={book.slug}
              book={book}
            />
          ))}
        </div>
      </section>
    )
  }
}

interface BookListProps {
  books: Book[];
  mode?: string;
}

export const BookList = ({ books, mode }: BookListProps) => {
  if (mode == "single") {
    return (
      <SingleBookComponent
        book={books[0]}
      />
    )
  } else {
    return (
      <MultiBooks mode={mode} books={books} />
    )
  }
}

export default BookList
