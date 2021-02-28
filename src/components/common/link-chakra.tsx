//https://zenn.dev/66ed3gs/articles/9f5a33c775842c

import React from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

const LinkChakra: React.FC<LinkProps> = (props) => {
  return (
    <NextLink href={props.href ?? ''}>
      <Link {...props} style={{textDecoration: 'none'}} onClick={() => (document.activeElement as HTMLElement).blur()} />
    </NextLink>
  );
};

export default LinkChakra;