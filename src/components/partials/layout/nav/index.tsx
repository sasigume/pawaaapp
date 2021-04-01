import dynamic from 'next/dynamic';
import { Box, HStack, Spacer, Switch, useColorMode } from '@chakra-ui/react';
import FaiconDiv from '@/components/common/faicon-div';
import { ReactNode } from 'react';
import DrawerLeft from './drawer-left';
import SiteLogo from '@/components/common/SiteLogo';
const SignIn = dynamic(() => import('./drawer-left/signin'), { ssr: false });

interface NavProps {
  preview: boolean;
  drawerLeftChildren?: ReactNode;
}
export default function Nav({ preview, drawerLeftChildren }: NavProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      zIndex={30}
      bg={colorMode == 'light' ? 'white' : 'blackAlpha.800'}
      w="100vw"
      as="nav"
      px={{ base: 2, md: 6 }}
      py={2}
      shadow="lg"
      position="fixed"
    >
      <HStack>
        <Box w={{ base: 'auto', xl: 0 }} display={{ base: 'flex', lg: 'none' }}>
          <DrawerLeft preview={preview}>
            <>{drawerLeftChildren}</>
          </DrawerLeft>
        </Box>
        <SiteLogo mr={6} display={{ base: 'none', sm: 'inherit' }} />
        <Spacer />
        <HStack mx={4}>
          <Box>
            {colorMode === 'light' ? (
              <FaiconDiv icon={['fas', 'sun']} />
            ) : (
              <FaiconDiv icon={['fas', 'moon']} />
            )}
          </Box>
          <Switch
            aria-label="カラーモードを切り替える"
            isChecked={colorMode == 'dark'}
            onChange={toggleColorMode}
          />
        </HStack>

        <Box pl={4}>
          <SignIn />
        </Box>
      </HStack>
    </Box>
  );
}
