import { Box, Code } from '@chakra-ui/react'
import Markdown from 'markdown-to-jsx'
import { compiler } from 'markdown-to-jsx'
import React from 'react'
import LinkChakra from '../link-chakra'

interface MdLinkProps {
  url: string
  title: string
}

const MdLink = ({ url, title }: MdLinkProps) => (
  <LinkChakra href="url" area-label={title}>
    <Box fontWeight="bold" transitionDuration=".3s" shadow="sm" _hover={{ shadow: "lg" }} my={4} p={3} rounded="lg" border="solid" borderWidth={1} borderColor="gray.400">
      <Box textStyle="h4">{title}</Box>
      {url}
    </Box>
  </LinkChakra>
)

const MdCode = ({ children }: any) => (<Code whiteSpace="pre-wrap" colorScheme="teal">{children}</Code>)

function MarkdownRender(props: any) {
  console.log
  // wrap with class for chakra theme
  return (
    <Box w="full" className="mdrenderWrapper">
     <Markdown children={props.source} options={{
        slugify: str => str,
        overrides: {
          MdLink: {
            component: MdLink
          },
          pre: {
            component: MdCode
          }
        }
      }} />
    </Box>
  )
}

export default MarkdownRender