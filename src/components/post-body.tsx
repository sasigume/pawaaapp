import markdownStyles from './markdown-styles.module.css'

interface Props {
  md: string;
}
export default function PostBody({ md }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: md }}
      />
    </div>
  )
}
