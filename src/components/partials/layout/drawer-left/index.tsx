import { ReactNode, useRef } from 'react'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import FaiconDiv from '@/components/common/faicon-div'

interface Props {
  preview: boolean;
  children: ReactNode
}

export default function DrawerLeft({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme="blue" leftIcon={<FaiconDiv icon={['fas', 'bars']} />} onClick={onOpen} position="fixed" top={5} left={5}>
        CONTENTS
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
            </DrawerHeader>
            <DrawerBody overflow-y="scroll">
              {children}
            </DrawerBody>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}