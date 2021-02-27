import Link from 'next/link'
import { BookChapter } from '@/models/contentful/BookChapter'

interface Props {
  bookChapter: BookChapter
  bookSlug: string;
  num:number
}

interface ListProps {
  bookChapters: BookChapter[]
  bookSlug: string
}


const OneBookChapter = ({ bookChapter, bookSlug, num }: Props) => {
  return (
    <Link href={(`/books/${bookSlug}/chapters/${num + 1}`)}>
      <a className="block rounded-xl p-4 shadow-xl border-gray-400 border-2 mb-8">
        <h2 className="text-xl font-bold mb-6">{bookChapter.title}</h2>
        <div>{bookChapter.description ?? '説明文がありません'}</div>
      </a>
    </Link>
  )
}

const BookChapterList = ({ bookChapters,bookSlug }: ListProps) => {
  return (
    <div className="">
      {bookChapters.map((c: BookChapter, num:number) => <OneBookChapter bookSlug={bookSlug} bookChapter={c} key={c.title} num={num} />)}
    </div>
  )
}

export default BookChapterList