import MarkdownRender from './MarkdownRender'

type QuestionProps = {
  tex: string;
}

function Question({ tex }: QuestionProps) {
  return (
    <div className="inline-block m-4 p-4 pb-2 border-2 border-gray-200 rounded-xl shadow-xl">
      <div className="mb-4 text-lg">次の定積分を求めよ</div>
      <MarkdownRender source={tex} />
    </div>
  )
}

export default Question