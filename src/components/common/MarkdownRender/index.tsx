import { Badge, Box, Code } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import JsxParser from "react-jsx-parser"
import LinkChakra from '../link-chakra'
import React from 'react'
import Image from 'next/image'

const gfm = require('remark-gfm')
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


function MarkdownRender(props: any) {

  // check if JSX has error
  const [showMd, setShowMd] = React.useState(true)

  const componentTransforms = {
    MdLink: (props: any) => <MdLink {...props} />,
  }


  const newProps = {
    source: props.source,
    plugins: [
      gfm,
    ],
    renderers: {
      ...props.renderers,

      heading: (props: any) => (
        <Box textStyle={(`h${props.level}`)}>
          {props.level == 1 && <h1>{props.children}</h1>}
          {props.level == 2 && <h2>{props.children}</h2>}
          {props.level == 3 && <h3>{props.children}</h3>}
          {props.level == 4 && <h4>{props.children}</h4>}
          {props.level == 5 && <h5>{props.children}</h5>}
          {props.level == 6 && <h6>{props.children}</h6>}
        </Box>),
      code: (props: any) =>
        <Code whiteSpace="pre-wrap" colorScheme="teal">{props.value}</Code>,
      image: (props: any) =>
        <Image {...props} />
    }
  }
  const newPropsIfValid = {
    ...newProps,
    renderers: {
      ...newProps.renderers,
      html: (props: any) =>
        <JsxParser
          renderError={(e) => <Badge colorScheme="red">{JSON.stringify(e)}</Badge>}
          // change state to false if JSX has error
          onError={(e) => { console.log(e); setShowMd(false) }}
          autoCloseVoidElements
          jsx={props.value}
          components={componentTransforms} />
    }
  }

  const ErrorMd = () => {
    if (!showMd) {
      return <>
        <Badge colorScheme="red">編集担当者へ: MarkdownをJSXとしてパースできませんでした</Badge>
        <ReactMarkdown allowDangerousHtml {...newProps} />
      </>
    } else {
      return <>
        <Badge>編集担当者へ: JSXにエラーなし</Badge>
        <ReactMarkdown allowDangerousHtml {...newPropsIfValid} />
      </>
    }
  }

  // wrap with class for chakra theme
  return (
    <Box w="full" className="mdrenderWrapper">
      <ErrorMd />
    </Box>
  );
}

export default MarkdownRender