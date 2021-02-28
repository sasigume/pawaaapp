
import CoverImageComponent from './cover-image-component'
import LinkChakra from '@/components/common/link-chakra'
import ChapterList from './chapter-list'
import { Book } from '@/models/contentful/Book'
import dayjs from 'dayjs'
import cn from 'classnames'
import { Box, Flex } from '@chakra-ui/react'

interface Props {
  book: Book
}
export function BookComponent({ book }: Props) {
  return (
    <Box m={3} p={6} rounded="2xl" shadow="xl">
      <Flex>
        <Box w={64} mr={4}>
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </Box>
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3">
            <LinkChakra href={`/books/${book.slug}`}>
              <div className="hover:underline">{book.title}</div>
            </LinkChakra>
          </h3>
          <div className="text-sm">
            <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
            <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          </div>
        </div>
      </Flex>
    </Box>
  )
}

export function SingleBookComponent({ book }: Props) {
  return (
    <article>
      <Box p={6}>
        <div className="mb-5 max-w-lg mx-auto overflow-hidden flex items-center">
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </div>
        <h1 className="text-3xl font-bold mb-6">
          <LinkChakra href={`/books/${book.slug}`}>
            <div className="hover:underline">{book.title}</div>
          </LinkChakra>
        </h1>

        <div className="mb-12">
          <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
        </div>
        {book.chaptersCollection.items.length > 0 && (<div className="text-sm mb-4">
          <ChapterList bookSlug={book.slug} bookChapters={book.chaptersCollection.items} />
        </div>)}
      </Box>
    </article>
  )
}
