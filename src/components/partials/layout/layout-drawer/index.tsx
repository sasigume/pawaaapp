import { ReactNode, useRef } from 'react'
import LinkChakra from '@/components/common/link-chakra'
import SignIn from './signin'
import {
  useColorMode,
  useDisclosure,
  Box,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FaiconDiv from '@/components/common/faicon-div'

interface Props {
  preview: boolean;
  children: ReactNode
}

export default function LayoutDrawer({ preview, children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme="blue" leftIcon={<FaiconDiv icon={['fas', 'bars']} />} onClick={onOpen} position="fixed" top={5} left={5}>
        MENU
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent pb={4}>
            <DrawerCloseButton />
            <DrawerHeader mt={8}>
              <Stack direction="column" spacing={4}>
                <Button colorScheme={colorMode === "light" ? "purple" : "cyan"} onClick={toggleColorMode} leftIcon={colorMode === "light" ? 
                (<FaiconDiv icon={['fas','moon']} />) : (<FaiconDiv  icon={['fas','sun']} />)}>
                  {colorMode === "light" ? "ダークモード" : "ライトモード"}
                </Button>
                <SignIn />
                <Button href="https://blog.pawaa.app" as={LinkChakra}>旧ブログ</Button>
                <Button href="/books" as={LinkChakra} colorScheme="green">本の一覧</Button>
              </Stack>
            </DrawerHeader>
            <DrawerBody>
              {children}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}