
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
export default function BookComponent({ book, mode }: Props) {
  return (
    <article>
      <div className={cn('px-6', {
        'mb-12': mode == "single",
        ' rounded-2xl shadow-xl p-6': mode !== "single"
      })}>
        <div className="mb-5">
          <CoverImageComponent slug={book.slug} title={book.title} url={book.coverImage ? book.coverImage.url : ''} />
        </div>
        {mode == "single" && (<h1 className="text-3xl font-bold mb-6">
          <Link as={`/books/${book.slug}`} href="/books/[slug]">
            <a className="hover:underline">{book.title}</a>
          </Link>
        </h1>
        )}
        {mode !== "single" && (<h3 className="text-3xl font-bold mb-3">
          <Link as={`/books/${book.slug}`} href="/books/[slug]">
            <a className="hover:underline">{book.title}</a>
          </Link>
        </h3>
        )}
        <div className={cn('text-lg',{
          'mb-6': mode == 'single',
          'mb-3' : mode !== 'single'
        })}>
          公開: {dayjs(book.sys.firstPublishedAt).format('YYYY/MM/DD HH:mm:ss')} /最終更新: {dayjs(book.sys.publishedAt).format('YYYY/MM/DD HH:mm:ss')}
        </div>
        {mode == 'single' && book.chaptersCollection.items.length > 0 && (<div className="text-sm mb-4">
          <ChapterList bookSlug={book.slug} bookChapters={book.chaptersCollection.items} />
        </div>)}
      </div>
    </article>
  )
}
