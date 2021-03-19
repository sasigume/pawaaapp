import {
  Box,
  Container,
} from '@chakra-ui/react'

import Image from 'next/image'

interface Props {
  totalCount?: number
}


const HeroWithThumbnails = ({ totalCount }: Props) => (
  <Box overflow="hidden" position="relative" background="linear-gradient(344deg, rgba(38,135,232,0.6320903361344538) 0%, rgba(58,199,227,0.4248074229691877) 100%)" mb={8} w="100vw" color="white">
    <Container my={20} textShadow="0px 1px 20px rgba(0,0,0,0.7), 0px 0px 4px rgba(0,0,0,0.9)">
      <Box mb={4} textStyle="h1">日本最大の、<br />マインクラフト情報源</Box>
      <Box textAlign="right">コマンド解説、アップデート情報などなど。{totalCount && (<><br />現在、{totalCount}本の記事が投稿されています。</>)}</Box>
    </Container>
    <Box w={{ base: "1200px", md: "1600px" }} h="full" zIndex={-5} position="absolute" top={{ base: -20, md: -380 }} left={{ base: -200, md: -40 }}>
      <Image src="/bg-thumbnails.png" width={1950} height={945} />
    </Box>
  </Box>
)

export default HeroWithThumbnails