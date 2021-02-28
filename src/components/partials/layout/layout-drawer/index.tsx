import { ReactNode, useRef } from 'react'
import LinkChakra from '@/components/common/link-chakra'
import SignIn from './signin'
import {
  useDisclosure,
  Box,
  Stack,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  preview: boolean;
  children: ReactNode
}

export default function LayoutDrawer({ preview, children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme="blue" leftIcon={<div className="w-4"><FontAwesomeIcon icon={['fas', 'user']} /></div>} onClick={onOpen} position="fixed" top={5} left={5}>
        MENU
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader mt={6}>
              <div className="w-64 py-4 md:py-2">

                {preview && (
                  <div>
                    <a
                      href="/api/exit-preview"
                      className="underline"
                    >
                      プレビュー解除
              </a>
                  </div>
                )}

              </div>
              <div className="">
                <SignIn />
                <Stack direction="row" spacing={4}>
                  <Button href="https://blog.pawaa.app" as={LinkChakra}>
                    旧ブログ
          </Button>
                </Stack>
              </div>
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