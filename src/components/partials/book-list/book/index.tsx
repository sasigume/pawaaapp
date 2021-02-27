
import CoverImageComponent from './cover-image-component'
import Link from 'next/link'
import ChapterList from './chapter-list'
import { Book } from '@/models/contentful/Book'
import dayjs from 'dayjs'
import cn from 'classnames'

interface Props {
  book: Book
  mode: string
}
export function BookComponent({ book, mode }: Props) {
  return (
    <article>
      <div className="p-6 rounded-2xl shadow-xl flex">
        <div className="mr-6 w-min-64 flex-grow-0">
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3">
            <Link as={`/books/${book.slug}`} href="/books/[slug]">
              <a className="hover:underline">{book.title}</a>
            </Link>
          </h3>
          <div className="text-sm">
            <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
            <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function SingleBookComponent({ book }: Props) {
  return (
    <article>
      <div className="px-6 mb-12 flex flex-col ">
        <div className="mb-5 max-w-lg mx-auto overflow-hidden flex items-center">
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </div>
        <h1 className="text-3xl font-bold mb-6">
          <Link as={`/books/${book.slug}`} href="/books/[slug]">
            <a className="hover:underline">{book.title}</a>
          </Link>
        </h1>

        <div className="mb-12">
          <div>公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
          <div>最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}</div>
        </div>
        {book.chaptersCollection.items.length > 0 && (<div className="text-sm mb-4">
          <ChapterList bookSlug={book.slug} bookChapters={book.chaptersCollection.items} />
        </div>)}
      </div>
    </article>
  )
}
