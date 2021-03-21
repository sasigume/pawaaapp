import {
  Box,
  Container,
} from '@chakra-ui/react'

import Image from 'next/image'

interface Props {
  totalCount?: number
}


const HeroWithThumbnails = ({ totalCount }: Props) => (
  <Box overflow="hidden" position="relative" background="linear-gradient(344deg, rgba(38,135,232,0.6320903361344538) 0%, rgba(58,199,227,0.4248074229691877) 100%)" mb={8} maxW="100vw" color="white">
    <Container textAlign="center" fontSize="3.5rem" fontWeight="bold" style={{ fontStyle: "italic" }} my={{ base: 8, md: 20 }} textShadow="0px 1px 30px rgba(0,0,0,0.7), 0px 0px 6px rgba(0,0,0,0.9)">
      {totalCount && (<Box>{totalCount} Posts</Box>)}
    </Container>
    <Box w={{ base: "1200px", md: "1600px" }} h="full" zIndex={-5} position="absolute" top={{ base: -20, md: -380 }} left={{ base: -200, md: -40 }}>
      <Image src="/bg-thumbnails.png" width={1950} height={945} />
    </Box>
  </Box>
)

export default HeroWithThumbnails