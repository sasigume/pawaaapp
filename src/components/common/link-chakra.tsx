//https://zenn.dev/66ed3gs/articles/9f5a33c775842c

import React from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

interface LinkChakraProps extends LinkProps {
  isUnderline?: boolean;
}

const LinkChakra: React.FC<LinkChakraProps> = (props) => {
  let textDec;
  props.isUnderline == true ? (textDec = 'underline') : (textDec = 'none');
  return (
    <NextLink href={props.href ?? ''}>
      <Link
        {...props}
        style={{ textDecoration: textDec }}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      />
    </NextLink>
  );
};

export default LinkChakra;
