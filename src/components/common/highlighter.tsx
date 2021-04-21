import hljs from 'highlight.js';
import 'highlight.js/styles/zenburn.css';

interface Props {
  code: string;
  language?: string;
}
//https://github.com/highlightjs/highlight.js/issues/925#issuecomment-744078627
export function Highlighter({ code, language }: Props): JSX.Element {
  const highlighted = language
    ? hljs.highlight(code, { language: language })
    : hljs.highlightAuto(code);

  return (
    <pre className="hljs">
      <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted.value }} />
    </pre>
  );
}
