import { Box, Center, Container } from '@chakra-ui/react';

interface Props {
  src: string;
}

const HeroWithImage = ({ src }: Props) => (
  <Box overflow="hidden" position="relative" mb={8} maxW="100vw" shadow="inner">
    <Container>
      <Center h="full">
        <img src={src} style={{ zIndex: -10 }} width={1300} />
      </Center>
    </Container>
  </Box>
);

export default HeroWithImage;
