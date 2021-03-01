import dayjs from 'dayjs'
import { Box, Center, Flex } from '@chakra-ui/react'
import { Book } from '@/models/contentful/Book'
import { BookChapter } from '@/models/contentful/BookChapter'

import LinkChakra from '@/components/common/link-chakra'
import ChapterList from '../common/chapter-list'
import BookImage from '../common/book-image'
import SubjectList from '../common/subject-list'
import CreatorList from '../common/creator-list'

import MarkdownRender from '@/components/common/MarkdownRender'

interface Props {
  book: Book
  expand: boolean
  mokuji?: boolean
}
export function BookComponent({ book }: Props) {
  return (
    <Flex rounded="xl" shadow="lg" p={6}>
      <Box mr={4}>
        <BookImage slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
      </Box>
      <Box flexGrow={1}>
        <Box textStyle="h4">
          <LinkChakra href={`/books/${book.slug}`}>
            <div className="hover:underline">{book.title}</div>
          </LinkChakra>
        </Box>
        <div className="text-sm">
          <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
        </div>
      </Box>
    </Flex>
  )
}

export function SingleBookComponent({ book, expand, mokuji }: Props) {
  return (
    <article>
      <Flex direction={{ base: "column", md: "row" }}>
        <Center>
          <Box width="300px" mr={{ base: 0, md: 8 }}>
            <Box mb={8}>
              <BookImage mode="single" slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
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
          </Box>
        </Center>

        <Box flexGrow={1}>
          <Box textStyle="h1" mb={8}>
            <h1>{book.title}</h1>
          </Box>
          {(expand && book.chaptersCollection.items.length > 0) && (<>
            <Box mb={6} textStyle="h1">WARNING: プレビュークッキーが検出されました。全展開モードで表示します</Box>
            {book.chaptersCollection.items.map(
              (c: BookChapter) => (
                <Flex direction="column" style={{ maxWidth: '650px' }} key={c.title}>
                  <Box textStyle="h2"><h2>{c.title}</h2></Box>
                  <MarkdownRender className="articleMdWrapper" source={c.md} />
                </Flex>
              )
            )}
          </>)}
          <Box my={4} fontSize="1.4rem">
            {book.description}
          </Box>
          {(mokuji != false && book.chaptersCollection.items.length > 0 )&& (<div className="text-sm mb-4">
            <ChapterList bookSlug={book.slug} bookChapters={book.chaptersCollection.items} />
          </div>)}
        </Box>
      </Flex>
    </article>
  )
}
