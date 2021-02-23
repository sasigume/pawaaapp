import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {CREATOR_ID} from '@/lib/constants'

const pkg = require('../../../../package.json')
const version = pkg.version
const repoUrl = pkg.repository.url

const LayoutFooter = () => (<div className="border-t border-gray-300 pt-3 mb-6 grid gap-y-3">
  <div>
    <a className="underline" href={(`https://twitter.com/${CREATOR_ID}`)}>不具合の報告</a>
  </div>
  <div className="">現在開発途中のためバグに遭遇するかもしれません。ご注意ください。</div>
  <Link href={repoUrl}>
    <a className="flex items-center">
      <div className="w-5 mr-2"><FontAwesomeIcon icon={['fab', 'github']} /></div>
      <span>View on GitHub / v{version}</span>
    </a>
  </Link>
</div>)

export default LayoutFooter