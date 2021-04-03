import { ReactNode, useRef } from 'react';

import {
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
import ColorSwitch from '../../color-switch';

interface Props {
  preview: boolean;
  children: ReactNode;
}

export default function DrawerLeft({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button
        zIndex={10}
        pr={2}
        ref={btnRef}
        colorScheme="blue"
        leftIcon={<FaiconDiv icon={['fas', 'bars']} />}
        onClick={onOpen}
      />
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
              <ColorSwitch />
            </DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
            <DrawerFooter>
              <Button leftIcon={<FaiconDiv icon={['fas', 'book']} />} as={LinkChakra} href="/eula/">
                利用規約
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
