import { BookChapter } from '@/models/contentful/BookChapter'
import MarkdownRender from '@/components/common/MarkdownRender'

interface Props {
  bookChapter: BookChapter
}

interface ListProps {
  bookChapters: BookChapter[]
}


const OneBookChapter = ({ bookChapter }: Props) => {
  let context
  if (bookChapter.md.includes('<p>')) {
    context = <div dangerouslySetInnerHTML={{ __html: bookChapter.md }} />
  } else {
    context = <>
      <MarkdownRender source={bookChapter.md} />
    </>
  }
  return (
    <div className="px-4 text-left w-screen lg:w-auto mx-auto mb-12">
      <h2 className="text-xl mb-6">{bookChapter.title}</h2>
      <div
        className="overflow-hidden globalStyle_content mx-auto" style={{ maxWidth: '650px' }}>
        {context}
      </div>
    </div>
  )
}

const BookChapterList = ({ bookChapters }: ListProps) => {
  return (
    <div className="flex flex-wrap">
      {bookChapters.map((s: BookChapter) => <OneBookChapter bookChapter={s} key={s.slug} />)}
    </div>
  )
}

export default BookChapterList