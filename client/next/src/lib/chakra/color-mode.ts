import { extendTheme } from '@chakra-ui/react';

interface Props {
  initialColorMode: 'light' | 'dark' | undefined;
  useSystemColorMode: boolean;
}

const config: Props = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colorMode = extendTheme({ config });
export default colorMode;
