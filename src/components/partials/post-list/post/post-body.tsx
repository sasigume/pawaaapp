import markdownStyles from './markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import MarkdownRender from '@/components/common/MarkdownRender'
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
    context = <MarkdownRender source={md} />
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
