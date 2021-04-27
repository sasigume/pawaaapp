import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '@/lib/chakra/theme';
interface Props {
  cookies: any;
  children: ReactNode;
}
export function Chakra({ cookies, children }: Props) {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;
  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}
export function getServerSideProps({ req }: any) {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
}
