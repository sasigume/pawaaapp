import MarkdownRender from './MarkdownRender'
import cn from 'classnames'

type QuestionProps = {
  q: string;
  tex: string;
  n: number
}

function Question({ q, tex, n }: QuestionProps) {
  return (
    <div className={cn('bg-white inline-block m-4 p-4 pb-2 border-2 border-gray-200 rounded-xl shadow-xl',
      {
        'mr-16': n % 2 == 0,
        'ml-16': n % 2 !== 0,
      })}>
      <div className="mb-4 text-lg flex flex-col md:flex-row justify-between">
        <div className="mr-3">{q}</div>
        <div>難易度:⭐️⭐️⭐️⭐️⭐️</div>
      </div>
      <div className="text-xl">
        <MarkdownRender source={tex} />
      </div>
    </div>
  )
}

export default Question