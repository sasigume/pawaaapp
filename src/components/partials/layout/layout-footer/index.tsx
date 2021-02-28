import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CREATOR_ID } from '@/lib/constants'
import LinkChakra from '@/components/common/link-chakra'
import Logo from '@/components/common/Logo'
import { Button, Box, Container, Flex, Stack, useColorMode } from '@chakra-ui/react'
import FaiconDiv from '@/components/common/faicon-div'

const pkg = require('../../../../../package.json')
const repoUrl = pkg.repository.url

const LayoutFooter = () => {
  const { colorMode } = useColorMode()

  return (
    <Box w="full" background="gray.700" py={8} color="white" textAlign="center" >

      <Container>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Box mb={2}>Brand-new way to study with books.</Box>
          <Box mb={4}><Logo fill="white" /></Box>
          <Box mb={4}>made with</Box>

          <Stack spacing={4} mb={6} direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="center">
            <Button colorScheme="blue" leftIcon={<div className="w-5 mr-1"><img src="/svg/next-js.svg" width="10" /></div>} href="https://nextjs.org/" as={LinkChakra}>
              Next.js
          </Button>

            <Button colorScheme="gray" href="https://www.contentful.com/" as={LinkChakra}>
              <img src={colorMode == "light" ? "/svg/contentful-black.svg" : "/svg/contentful.svg"} width="100" />
            </Button>

            <Button colorScheme="teal" leftIcon={<FaiconDiv color="white" icon={['fab', 'github']} />} href={repoUrl} as={LinkChakra}>
              GitHub
          </Button>

          </Stack>
          <div>This app is distributed under MIT Lisence. Developed by{` `}
            <LinkChakra href={(`https://twitter.com/${CREATOR_ID}`)}>@{CREATOR_ID}</LinkChakra></div>
        </Flex>
      </Container>

    </Box >
  )
}

export default LayoutFooter