import { useColorMode } from '@chakra-ui/color-mode'
import { Box, Center } from '@chakra-ui/layout'
import { ReactNode } from 'react'


interface Props {
  preview: boolean;
  children: ReactNode
}

export default function LeftFixed({ children }: Props) {

  return (
    <>
      <Center display={{ base: "none", xl: "flex" }} w="18rem" position="fixed" top={0} bottom={0} left={0}>
        <Box color="black" zIndex={5}  shadow="lg" roundedRight="xl" w="full" p={3} bg="gray.100">{children}</Box>
      </Center>
    </>
  )
}