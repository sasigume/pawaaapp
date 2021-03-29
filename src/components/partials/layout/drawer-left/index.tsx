import dynamic from 'next/dynamic';
import { ReactNode, useRef } from 'react';

import {
  useColorMode,
  useDisclosure,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Center,
} from '@chakra-ui/react';

const SignIn = dynamic(() => import('./signin'), { ssr: false });
// issue#106
/*const FaiconDiv = dynamic(() => import('@/components/common/faicon-div'));
const Logo = dynamic(() => import('@/components/common/Logo'));*/
//import SignIn from './signin';
import FaiconDiv from '@/components/common/faicon-div';
import Logo from '@/components/common/Logo';
import LinkChakra from '@/components/common/link-chakra';

interface Props {
  preview: boolean;
  children: ReactNode;
}

export default function DrawerLeft({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button
        zIndex={10}
        pr={{ base: 2, md: 4 }}
        ref={btnRef}
        colorScheme="blue"
        leftIcon={<FaiconDiv icon={['fas', 'bars']} />}
        onClick={onOpen}
      >
        <Box display={{ base: 'none', sm: 'flex' }}>MENU</Box>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        aria-label="ドロワーメニュー(左)"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody overflow-y="scroll" mt={16}>
              <Button
                mb={6}
                textAlign="center"
                display={{ base: 'none', md: 'flex' }}
                as={LinkChakra}
                colorScheme="orange"
                href="/entityatsume/"
              >
                エンティティあつめ
              </Button>
              {children}
            </DrawerBody>
            <DrawerFooter>
              <Stack w="full" direction="column" spacing={6} mb={6}>
                <Button as={LinkChakra} colorScheme="blackAlpha" href="/contact/">
                  お問い合わせ
                </Button>
                <Box>
                  Powered by
                  <Box mb={8}>
                    <Center>
                      <Logo fill={colorMode === 'light' ? '#000' : '#fff'} />
                    </Center>
                  </Box>
                </Box>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
