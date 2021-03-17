import { ReactNode, useRef } from 'react'
import SignIn from './signin'
import {
  useColorMode,
  useDisclosure,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Center,
  Divider,
} from "@chakra-ui/react"
import FaiconDiv from '@/components/common/faicon-div'
import Logo from '@/components/common/Logo'

interface Props {
  preview: boolean;
  children: ReactNode
}

export default function DrawerLeft({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Button zIndex={10} pr={{base:2,md:4}} ref={btnRef} colorScheme="blue" leftIcon={<FaiconDiv icon={['fas', 'bars']} />} onClick={onOpen} position="fixed" top={5} left={5}>
        <Box display={{ base: "none", md: "flex" }}>MENU</Box>
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
              <Divider mb={8} />

              <Stack direction="column" spacing={6} mb={6}>
                <Button aria-label="カラーモードを切り替える" colorScheme={colorMode === "light" ? "purple" : "cyan"} onClick={toggleColorMode} leftIcon={colorMode === "light" ?
                  (<FaiconDiv icon={['fas', 'moon']} />) : (<FaiconDiv icon={['fas', 'sun']} />)}>
                  {colorMode === "light" ? "ダークモード" : "ライトモード"}
                </Button>
              </Stack>

              <SignIn />
            </DrawerHeader>
            <DrawerBody overflow-y="scroll">
              {children}
            </DrawerBody>
            <DrawerFooter>
              <Box>Powered by
              <Box mb={8}>
                  <Center>
                    <Logo fill={colorMode === "light" ? "#000" : "#fff"} />
                  </Center>
                </Box>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}