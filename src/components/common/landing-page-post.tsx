import MarkdownRender from './MarkdownRender'
import cn from 'classnames'
import { LandingPagePost } from '@/models/contentful/LandingPagePost'
import Image from 'next/image'

interface Props {
  post: LandingPagePost
  n: number
}

const LandingPagePostComponent = ({ post, n }: Props) => (
  <div className={
    cn('bg-white inline-block m-4 p-4 pb-2 border-2 border-gray-200 rounded-xl shadow-xl',
      {
        'mr-16': n % 2 == 0,
        'ml-16': n % 2 !== 0,
      })}>
    <div className="mb-4 text-lg flex flex-col md:flex-row justify-between">
      <div className="mr-3 flex items-center">
        <Image src={post.accountPicture.url} width={32} height={32} />
        <div>{post.accountName}</div>
        </div>

      <div>難易度:⭐️⭐️⭐️⭐️⭐️</div>
    </div>
    <div className="text-xl">
      <MarkdownRender source={post.md} />
    </div>
  </div >
)

export default LandingPagePostComponent