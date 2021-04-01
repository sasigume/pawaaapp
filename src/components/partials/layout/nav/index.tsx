import dynamic from 'next/dynamic';
import { Box, Center, HStack, Spacer, Switch, useColorMode } from '@chakra-ui/react';
import FaiconDiv from '@/components/common/faicon-div';
import { ReactNode } from 'react';
import { Platform } from '@/models/contentful/Platform';
import PlatformList from '../../post/common/platform-list';
import DrawerLeft from './drawer-left';
import SiteLogo from '@/components/common/SiteLogo';
const SignIn = dynamic(() => import('./drawer-left/signin'), { ssr: false });

interface NavProps {
  preview: boolean;
  drawerLeftChildren?: ReactNode;
  platforms?: Platform[];
}
export default function Nav({ preview, drawerLeftChildren, platforms }: NavProps) {
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
            <>
              {drawerLeftChildren}
              {platforms && platforms?.length > 0 && (
                <Box ml={-2}>
                  <PlatformList heading platforms={platforms} />
                </Box>
              )}
            </>
          </DrawerLeft>
        </Box>
        <SiteLogo mr={6} display={{ base: 'none', sm: 'inherit' }} />
        <Spacer />
        {platforms && platforms?.length > 0 && (
          <Center pr={6} pl={32} h="40px" overflow="scroll" display={{ base: 'none', lg: 'flex' }}>
            <PlatformList mode="top" platforms={platforms} />
          </Center>
        )}
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

        <SignIn />
      </HStack>
    </Box>
  );
}
