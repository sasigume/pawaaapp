import { Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import React from 'react'
import LinkChakra from '../link-chakra'
import { SITE_URL } from '@/lib/constants'
const gfm = require('remark-gfm')

interface RenderProps {
  source: string
  plugins?: any[]
  renderers?: any
}

interface CodeProps {
  language: string,
  value: any
}


interface LinkProps {
  href: string,
  node: any
}

const LinkConverter = (props: LinkProps) => {
  let isExternal = false
  if (props.href.includes('http')) {
    props.href.includes(SITE_URL) ? isExternal = false : isExternal = true
  }
  return (
    <LinkChakra isExternal={isExternal} href={props.href}>{props.node.children[0].value}</LinkChakra>
  )
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

      link: (props: any) => (
        <LinkConverter {...props} />
      ),
      heading: (props: any) => (
        <Box textStyle={(`h${props.level}`)}>
          {props.level == 1 && <h1 id={headingId(props)}>{props.children}</h1>}
          {props.level == 2 && <h2 id={headingId(props)}>{props.children}</h2>}
          {props.level == 3 && <h3 id={headingId(props)}>{props.children}</h3>}
          {props.level == 4 && <h4 id={headingId(props)}>{props.children}</h4>}
          {props.level == 5 && <h5 id={headingId(props)}>{props.children}</h5>}
          {props.level == 6 && <h6 id={headingId(props)}>{props.children}</h6>}
        </Box>),
      code: ({ language, value }: CodeProps) => {
        return <SyntaxHighlighter style={atomDark} language={language} children={value} />
      },
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