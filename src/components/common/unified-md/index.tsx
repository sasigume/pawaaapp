import { Box } from '@chakra-ui/react'
import React from 'react'
const unified = require('unified')
const remarkParse = require('remark-parse')
const directive = require('remark-directive')
const rehypeStringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')
const gfm = require('remark-gfm')
interface RenderProps {
  source: string
}

function UnifiedMd(props: RenderProps) {

  const result = unified()
    .use(remarkParse)
    .use(directive)
    .use(gfm)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(props.source)

  return (<>
    <Box w="full" className="mdrenderWrapper" dangerouslySetInnerHTML={{ __html: result.contents }} />
  </>)

  // match id space to automatic generated anchor link hyphene
  const headingId = (props: any) => props.children[0].props.children.replace(` `, `-`)

  /* const newProps = {
    source: props.source,
    plugins: [
      gfm,
      [remarkCustomBlocks, {
        MdLink: {
          classes: 'md_link',
          title: 'required',
        }
      }]
    ],
    renderers: {
      ...props.renderers,

      heading: (props: any) => (
        <Box textStyle={(`h${props.level}`)}>
          {props.level == 1 && <h1 id={headingId(props)}>{props.children}</h1>}
          {props.level == 2 && <h2 id={headingId(props)}>{props.children}</h2>}
          {props.level == 3 && <h3 id={headingId(props)}>{props.children}</h3>}
          {props.level == 4 && <h4 id={headingId(props)}>{props.children}</h4>}
          {props.level == 5 && <h5 id={headingId(props)}>{props.children}</h5>}
          {props.level == 6 && <h6 id={headingId(props)}>{props.children}</h6>}
        </Box>),
      code: (props: any) =>
        <Code whiteSpace="pre-wrap" colorScheme="teal">{props.value}</Code>,
    }
  } */
}

export default UnifiedMd