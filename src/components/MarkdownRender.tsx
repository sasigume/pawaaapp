import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';

function MarkdownRender(props:any) {
    const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          ...props.renderers,
          math: (props:any) => 
            <MathJax.Node formula={props.value} />,
          inlineMath: (props:any) =>
            <MathJax.Node inline formula={props.value} />
        }
      };
      return (
        <MathJax.Provider input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Provider>
      );
}

export default MarkdownRender