import MarkdownRender from '@/components/common/MarkdownRender'
interface Props {
  md: string;
}
export default function PostBody({ md }: Props) {
  return (
    <div className="px-4 text-left lg:w-auto mx-auto">
      <div
        className="overflow-hidden globalStyle_content mx-auto" style={{maxWidth: '650px'}}>
        <MarkdownRender source={md} />
      </div>
    </div>
  )
}
