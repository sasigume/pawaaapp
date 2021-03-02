import dayjs from 'dayjs'
import { Box, Flex, Stack, Button, Center, Divider } from "@chakra-ui/react"

import LinkChakra from "@/components/common/link-chakra"
import BookImage from '../common/book-image'
import CreatorList from '../common/creator-list'
import SubjectList from '../common/subject-list'
import MarkdownRender from "@/components/common/MarkdownRender"
import { Book } from "@/models/contentful/Book"
import { BookChapter } from "@/models/contentful/BookChapter"
import Mokuzi from '@/components/common/mokuzi'


interface ChapterProps {
  book: Book
  chapter: BookChapter,
  chapterNumber: number
}

interface PageButtonsProps {
  book: Book,
  chapterNumber: number
}

const PageButtons = ({ book, chapterNumber }: PageButtonsProps) => {
  return (
    <Center my={8}>
      <Stack direction="row" spacing={4}>
        {chapterNumber != 1 && (
          <Button colorScheme="red" as={LinkChakra} href={(`/books/${book.slug}/chapters/${chapterNumber - 1}`)}>
            &lt; 前ページ
          </Button>)}
        <Button colorScheme="gray" as={LinkChakra} href={(`/books/${book.slug}`)}>
          目次へ
    </Button>
        {(chapterNumber) < book.chaptersCollection.items.length && (
          <Button colorScheme="green" as={LinkChakra} href={(`/books/${book.slug}/chapters/${chapterNumber + 1}`)}>
            次ページ &gt;
          </Button>)}
      </Stack>
    </Center>
  )
}

const SingleChapter = ({ book, chapter, chapterNumber }: ChapterProps) => {
  return (
    <article area-label={'「' + book.title + '」のチャプター' + chapterNumber + '、「' + chapter.title + '」'}>
      <Flex direction={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "stretch" }} px={6}>
        <Center mb={{ base: 16, md: 0 }} alignItems="start" display={{ base: "none", md: "flex" }}>
          <Box width="300px" mr={{ base: 0, md: 8, lg: 16 }} h="full">
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
            {/* set max height so that can scroll on desktop */}
            <Box position="sticky" top={20} overflowY="scroll" style={{ maxHeight: 'calc(100vh - 7rem)' }}>
              {book.chaptersCollection.items && <Mokuzi chapters={book.chaptersCollection.items} bookSlug={book.slug} />}
            </Box>
          </Box>
        </Center>

        <Center flexGrow={1}>
          <Box style={{ maxWidth: '650px' }}>
            <LinkChakra href={(`/books/${book.slug}`)}>
              <Box textStyle="h2" mb={10}>
                <h1>{book.title}</h1>
              </Box>
            </LinkChakra>
            <PageButtons book={book} chapterNumber={chapterNumber} />
            <Flex direction="column" style={{ maxWidth: '650px' }}>
              <Box textStyle="h3" mb={12}>
                <h2>{chapter.title}</h2>
                <Divider />
              </Box>
              <Box mb={6}>{chapter.description}</Box>
              <MarkdownRender className="articleMdWrapper" source={chapter.md} />
            </Flex>
            <PageButtons book={book} chapterNumber={chapterNumber} />
          </Box>
        </Center>

      </Flex>
    </article>
  )
}

export default SingleChapter