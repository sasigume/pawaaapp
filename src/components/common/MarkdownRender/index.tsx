import { Box, Code } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
const gfm = require('remark-gfm')



function MarkdownRender(props: any) {
  const newProps = {
    ...props,
    plugins: [
      RemarkMathPlugin,
      gfm
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
        <Code colorScheme="teal">{props.value}</Code>,
      math: (props: any) =>
        <MathJax.Node formula={props.value} />,
      inlineMath: (props: any) =>
        <MathJax.Node inline formula={props.value} />
    }
  };
  // wrap with class for chakra theme
  return (
    <Box w="full" className="mdrenderWrapper">
      <MathJax.Provider input="tex">
        <ReactMarkdownWithHtml allowDangerousHtml {...newProps} />
      </MathJax.Provider>
    </Box>
  );
}

export default MarkdownRender