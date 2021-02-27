import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CREATOR_ID} from '@/lib/constants'
import Link from 'next/link'
import Logo from '@/components/common/Logo'

const pkg = require('../../../../../package.json')
const repoUrl = pkg.repository.url

const LayoutFooter = () => (
  <div className="w-screen border-t bg-gray-700 text-white py-10 text-center px-2 flex justify-center">
    <div className="flex flex-col items-center justify-center">
    <div className="mb-4"><Logo fill="white" /></div>
      <div className="mb-2">made with</div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between ">
      <Link href="https://nextjs.org/">
          <a className="flex items-center mx-2 mb-6">
            <div className="w-5 mr-1"><img src="/svg/next-js.svg" className="text-white" width="100" /></div>
            <span>Next.js</span>
          </a>
        </Link>

        <Link href="https://www.contentful.com/">
          <a className="flex items-center mx-2 mb-6">
            <div className="w-24"><img src="/svg/contentful.svg" width="100" /></div>
          </a>
        </Link>

        <Link href={repoUrl}>
          <a className="flex items-center mx-2 mb-6">
            <div className="w-5 mr-1"><FontAwesomeIcon icon={['fab', 'github']} /></div>
            <span>GitHub</span>
          </a>
        </Link>
      </div>
      <div>This app is distributed under MIT Lisence. Developed by{` `}
        <Link href={(`https://twitter.com/${CREATOR_ID}`)}><a>@{CREATOR_ID}</a></Link></div>
    </div>
  </div>)

export default LayoutFooter