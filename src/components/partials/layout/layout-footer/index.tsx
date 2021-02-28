import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CREATOR_ID } from '@/lib/constants'
import LinkChakra from '@/components/common/link-chakra'
import Logo from '@/components/common/Logo'
import { Box, Container, Flex } from '@chakra-ui/react'

const pkg = require('../../../../../package.json')
const repoUrl = pkg.repository.url

const LayoutFooter = () => (
  <Box w="full" background="gray.700" py={8} color="white" textAlign="center">
    <Flex direction="column">
      <Container>
        <div className="mb-2">Brand-new way to study with books.</div>
        <div className="mb-4"><Logo fill="white" /></div>
        <div className="mb-2">made with</div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between ">
          <LinkChakra href="https://nextjs.org/">
            <div className="flex items-center mx-2 mb-6">
              <div className="w-5 mr-1"><img src="/svg/next-js.svg" className="text-white" width="100" /></div>
              <span>Next.js</span>
            </div>
          </LinkChakra>

          <LinkChakra href="https://www.contentful.com/">
            <div className="flex items-center mx-2 mb-6">
              <div className="w-24"><img src="/svg/contentful.svg" width="100" /></div>
            </div>
          </LinkChakra>

          <LinkChakra href={repoUrl}>
            <div className="flex items-center mx-2 mb-6">
              <div className="w-5 mr-1"><FontAwesomeIcon icon={['fab', 'github']} /></div>
              <span>GitHub</span>
            </div>
          </LinkChakra>
        </div>
        <div>This app is distributed under MIT Lisence. Developed by{` `}
          <LinkChakra href={(`https://twitter.com/${CREATOR_ID}`)}>@{CREATOR_ID}</LinkChakra></div>
      </Container>
    </Flex>
  </Box>)

export default LayoutFooter