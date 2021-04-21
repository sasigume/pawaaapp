import { Box, StyleProps } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import LinkChakra from '../../../../common/link-chakra';
import { SITE_URL } from '@/lib/constants';
import LazyLoad from 'react-lazyload';
const gfm = require('remark-gfm');

// oldStyleModuleCss is temporaly fix while replacing terrible classes in old articles
import oldStyleModuleCss from './style-for-old-articles.module.css';
import dynamic from 'next/dynamic';
const Highlighter = dynamic(() => import('@/components/common/highlighter'));

interface RenderProps {
  source: string;
  plugins?: any[];
  renderers?: any;
  style?: StyleProps;
}

interface CodeProps {
  language: string;
  value: any;
}

interface LinkProps {
  href: string;
  node: any;
}

const LinkConverter = (props: LinkProps) => {
  let isExternal = false;
  if (props.href.includes('http')) {
    props.href.includes(SITE_URL) ? (isExternal = false) : (isExternal = true);
  }
  return (
    <LinkChakra isExternal={isExternal} href={props.href}>
      {props.node.children[0].value}
    </LinkChakra>
  );
};

const PostBody = (props: RenderProps) => {
  // match id space to automatic generated anchor link hyphene
  const headingId = (props: any) => props.node.children[0].value.replace(` `, `-`);
  //const headingId = (props: any) => <Box>{JSON.stringify(props)}</Box>;

  const newProps = {
    source: props.source,
    plugins: [gfm],
    renderers: {
      ...props.renderers,

      link: (props: any) => <LinkConverter {...props} />,
      heading: (props: any) => (
        <Box textStyle={`h${props.level}`}>
          {props.level == 1 && <h1 id={headingId(props)}>{props.children}</h1>}
          {props.level == 2 && <h2 id={headingId(props)}>{props.children}</h2>}
          {props.level == 3 && <h3 id={headingId(props)}>{props.children}</h3>}
          {props.level == 4 && <h4 id={headingId(props)}>{props.children}</h4>}
          {props.level == 5 && <h5 id={headingId(props)}>{props.children}</h5>}
          {props.level == 6 && <h6 id={headingId(props)}>{props.children}</h6>}
        </Box>
      ),
      code: ({ language, value }: CodeProps) => {
        return <Highlighter language={language} code={value} />;
      },
      html: (props: any) => (
        <>
          <div className="containHtml" dangerouslySetInnerHTML={{ __html: props.value }} />
        </>
      ),
      image: (props: any) => (
        <LazyLoad h={200}>
          <img src={props.src} alt={props.alt} />
        </LazyLoad>
      ),
    },
  };

  const MdRenderer = () => {
    return <ReactMarkdown allowDangerousHtml {...newProps} />;
  };

  // wrap with class for chakra theme
  return (
    <Box sx={props.style ?? {}} w="full" className={'mdrenderWrapper ' + oldStyleModuleCss['sfoa']}>
      <MdRenderer />
    </Box>
  );
};

export default PostBody;
