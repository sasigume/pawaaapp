
import CoverImageComponent from './cover-image-component'
import LinkChakra from '@/components/common/link-chakra'
import ChapterList from './chapter-list'
import { Book } from '@/models/contentful/Book'
import dayjs from 'dayjs'
import SubjectList from './subject-list'
import CreatorList from './creator-list'
import { Box, Center, Flex } from '@chakra-ui/react'
import { BookChapter } from '@/models/contentful/BookChapter'
import MarkdownRender from '@/components/common/MarkdownRender'

interface Props {
  book: Book
  expand: boolean
}
export function BookComponent({ book }: Props) {
  return (
    <Box m={3} p={6} rounded="2xl" shadow="xl">
      <Flex>
        <Box w={64} mr={4}>
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </Box>
        <div className="flex-grow">
          <Box textStyle="h3">
            <LinkChakra href={`/books/${book.slug}`}>
              <div className="hover:underline">{book.title}</div>
            </LinkChakra>
          </Box>
          <div className="text-sm">
            <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
            <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          </div>
        </div>
      </Flex>
    </Box>
  )
}

export function SingleBookComponent({ book, expand }: Props) {
  return (
    <article>
      <Flex direction="column" alignItems="center" p={6}>
        <Box mb={10} maxW="md">
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </Box>
        <Box textStyle="h1" mb={8}>
          <h1>{book.title}</h1>
        </Box>
        {(book.subjectsCollection && book.subjectsCollection.items.length > 0) && (<div className="text-sm mb-4">
          <SubjectList subjects={book.subjectsCollection.items} />
        </div>)}

        {(book.creatorsCollection && book.creatorsCollection.items.length > 0) && (<div className="text-sm mb-4">
          <CreatorList creators={book.creatorsCollection.items} />
        </div>)}

        <Box mb={6}>
          <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
        </Box>
        {(expand && book.chaptersCollection.items.length > 0) && (<>
        <Box mb={6} textStyle="h1">WARNING: プレビュークッキーが検出されました。全展開モードで表示します</Box>
          {book.chaptersCollection.items.map(
            (c: BookChapter) => (
              <Flex direction="column" style={{ maxWidth: '650px' }}>
                <Box textStyle="h2"><h2>{c.title}</h2></Box>
                <MarkdownRender className="articleMdWrapper" source={c.md} />
              </Flex>
            )
          )}
        </>)}
        {book.chaptersCollection.items.length > 0 && (<div className="text-sm mb-4">
          <ChapterList bookSlug={book.slug} bookChapters={book.chaptersCollection.items} />
        </div>)}
      </Flex>
    </article>
  )
}
