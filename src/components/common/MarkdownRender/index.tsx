import { Badge, Box, Code } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import LinkChakra from '../link-chakra'
import React from 'react'
const gfm = require('remark-gfm')
interface RenderProps {
  source: string
  plugins?: any[]
  renderers?: any
}

const MarkdownRender = (props: RenderProps) => {

  // match id space to automatic generated anchor link hyphene
  const headingId = (props: any) => props.children[0].props.children.replace(` `, `-`)

  const newProps = {
    source: props.source,
    plugins: [
      gfm,
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
      html: (props: any) =>
        <div className="containHtml" dangerouslySetInnerHTML={{ __html: props.value }} />
    }
  }

  const MdRenderer = () => {
    return <ReactMarkdown allowDangerousHtml {...newProps} />
  }

  // wrap with class for chakra theme
  return (
    <Box w="full" className="mdrenderWrapper">
      <MdRenderer />
    </Box>
  );
}

export default MarkdownRender