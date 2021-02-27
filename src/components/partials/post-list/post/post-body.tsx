import MarkdownRender from '@/components/common/MarkdownRender'
interface Props {
  md: string;
}
export default function PostBody({ md }: Props) {
  let context
  if (md.includes('<p>')) {
    context = <div dangerouslySetInnerHTML={{ __html: md }} />
  } else {
    context = <>
    <MarkdownRender source={md} />
    </>
  }
  return (
    <div className="px-4 text-left lg:w-auto mx-auto">
      <div
        className="overflow-hidden globalStyle_content mx-auto" style={{maxWidth: '650px'}}>
        {context}
      </div>
    </div>
  )
}
