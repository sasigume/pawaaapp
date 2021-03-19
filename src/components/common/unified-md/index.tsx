import { Box, Code } from '@chakra-ui/react'
import React from 'react'
import { Remark } from 'react-remark'
import LinkChakra from '../link-chakra'
const gfm = require('remark-gfm')

interface RenderProps {
  source: string
}

interface MdLinkProps {
  url: string
  title: string
}

const MdLink = ({ url, title }: MdLinkProps) => (
  <LinkChakra href={url} area-label={title}>
    <Box fontWeight="bold" transitionDuration=".3s" shadow="sm" _hover={{ shadow: "lg" }} my={4} p={3} rounded="lg" border="solid" borderWidth={1} borderColor="gray.400">
      <Box textStyle="h4">{title}</Box>
      {url}
    </Box>
  </LinkChakra>
)

function UnifiedMd(props: RenderProps) {

  // match id space to automatic generated anchor link hyphene
  const headingId = (props: any) => props.children[0].replace(` `, `-`)

  return (<>
    <Box w="full" className="mdrenderWrapper">
      <Remark
        //remarkParseOptions={}
        remarkPlugins={[gfm]}
        //remarkToRehypeOptions={}
        //rehypePlugins={}
        rehypeReactOptions={{
          components: {
            h1: (props: any) =>
              <Box textStyle="h1"><h1 id={headingId(props)} {...props} /></Box>,
            h2: (props: any) =>
              <Box textStyle="h2"><h2 id={headingId(props)} {...props} /></Box>,
            h3: (props: any) =>
              <Box textStyle="h2"><h3 id={headingId(props)} {...props} /></Box>,
            h4: (props: any) =>
              <Box textStyle="h2"><h4 id={headingId(props)} {...props} /></Box>,
            h5: (props: any) =>
              <Box textStyle="h2"><h5 id={headingId(props)} {...props} /></Box>,
            h6: (props: any) =>
              <Box textStyle="h2"><h6 id={headingId(props)} {...props} /></Box>,
            code: (props: any) =>
              <Code whiteSpace="pre-wrap" colorScheme="teal">{props.value}</Code>,
          },
        }}
      >
        {props.source}
      </Remark>
    </Box>
  </>)
}

export default UnifiedMd