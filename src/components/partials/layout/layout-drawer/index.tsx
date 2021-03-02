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
  Center,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FaiconDiv from '@/components/common/faicon-div'
import Logo from '@/components/common/Logo'

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
        aria-label="ドロワーメニュー"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>


              <Stack direction="row" spacing={2} mb={4}>
                <Button aria-label="カラーモードを切り替える" colorScheme={colorMode === "light" ? "purple" : "cyan"} onClick={toggleColorMode} leftIcon={colorMode === "light" ?
                  (<FaiconDiv icon={['fas', 'moon']} />) : (<FaiconDiv icon={['fas', 'sun']} />)}>
                  {colorMode === "light" ? "ダークモード" : "ライトモード"}
                </Button>
              </Stack>

              <Stack direction="row" spacing={2} mb={4}>
                <Button href="https://blog.pawaa.app" as={LinkChakra}>旧ブログ</Button>
                <Button aria-label="教科の一覧を見る" href="/subjects" as={LinkChakra} colorScheme="blue">教科一覧</Button>
              </Stack>

              <SignIn />

            </DrawerHeader>
            <DrawerBody overflow-y="scroll">
              {children}
            </DrawerBody>
            <DrawerFooter justifyContent="center">
              <Box>
                <Center>
                  <Logo fill={colorMode === "light" ? "#000" : "#fff"} />
                </Center>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}