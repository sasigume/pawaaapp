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
  DrawerHeader,
} from '@chakra-ui/react';

// issue#106
/*const FaiconDiv = dynamic(() => import('@/components/common/faicon-div'));
const Logo = dynamic(() => import('@/components/common/Logo'));*/
//import SignIn from './signin';
import FaiconDiv from '@/components/common/faicon-div';
import LinkChakra from '@/components/common/link-chakra';
import SiteLogo from '@/components/common/SiteLogo';

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
        pr={{ base: 2, sm: 4 }}
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
            <DrawerHeader>
              <SiteLogo />
            </DrawerHeader>
            <DrawerBody overflow-y="scroll">
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
            <DrawerFooter mt={6}>
              <Button w="full" as={LinkChakra} colorScheme="blackAlpha" href="/contact/">
                お問い合わせ
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
