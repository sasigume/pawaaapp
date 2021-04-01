import dynamic from 'next/dynamic';
import { SITE_NAME } from '@/lib/constants';
import { Box, Button, HStack, Spacer, Switch, useColorMode } from '@chakra-ui/react';
import Image from 'next/image';
import FaiconDiv from '@/components/common/faicon-div';
import { ReactNode } from 'react';
import LinkChakra from '@/components/common/link-chakra';
const DrawerLeft = dynamic(() => import('../drawer-left'));
const SignIn = dynamic(() => import('../drawer-left/signin'), { ssr: false });

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
          <DrawerLeft preview={preview}>{drawerLeftChildren}</DrawerLeft>
        </Box>
        <LinkChakra mr={6} fontWeight="bold" href="/" display={{ base: 'none', sm: 'flex' }}>
          <HStack>
            <Box mt={-1} mr={2} w={10} h={10}>
              <Image src="/icon-180x.png" width={80} height={80} />
            </Box>

            <Box textAlign="left" as="h1" fontSize={16} w={20}>
              {SITE_NAME}
            </Box>
          </HStack>
        </LinkChakra>
        <Button
          textAlign="center"
          display={{ base: 'none', md: 'flex' }}
          as={LinkChakra}
          colorScheme="orange"
          href="/entityatsume/"
        >
          エンティティあつめ
        </Button>
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

        <SignIn />
      </HStack>
    </Box>
  );
}
