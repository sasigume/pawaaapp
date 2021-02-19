import markdownStyles from './markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
interface Props {
  md: string;
}
export default function PostBody({ md }: Props) {
  let context
  if (md.includes('<p>')) {
    console.log('HTML detected')
    context = <div dangerouslySetInnerHTML={{ __html: md }} />
  } else {
    console.log('MD detected')
    context = <ReactMarkdown children={md} />
  }
  return (
    <div className="text-left w-full max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}>
        {context}
      </div>
    </div>
  )
}
