import {
  Box,
  Center,
  Container,
} from '@chakra-ui/react'

interface Props {
  src: string
}


const HeroWithImage = ({ src }: Props) => (
  <Box overflow="hidden" position="relative" mb={8} background="linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)" maxW="100vw" shadow="inner">
    <Container h={{ base: "140px", md: "300px" }}>
      <Center h="full">
        <img src={src} style={{zIndex:-10}} width={1300} />
      </Center>
    </Container>
  </Box>
)

export default HeroWithImage