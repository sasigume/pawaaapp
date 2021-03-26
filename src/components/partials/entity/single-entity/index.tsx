import { Box, Center, Flex } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import { Entity } from '@/models/nest/Entity';
import Image from 'next/image';

interface Props {
  entity: Entity;
}

export function SingleEntityComponent({ entity }: Props) {
  return (
    <>
      <Box bg="black" mb={8} direction="column" position="relative" rounded="lg">
        <Center
          zIndex={10}
          position="absolute"
          top={2}
          left={2}
          bg="red.600"
          color="white"
          fontWeight="bold"
          fontSize="2rem"
          fontFamily="mono"
          w={16}
          h={16}
          borderWidth={2}
          borderColor="black"
          rounded="full"
        >
          {entity.dec}
        </Center>
        <Box position="relative" m={4} rounded="lg">
          <Box w="full" zIndex={1} position="absolute" top={0} left={0}>
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMax slice"
              viewBox="0 0 500 100"
            >
              <polygon fill="black" points="10,0 500,0 500,70 40,70" />
              <polygon fill="white" points="10,3 500,3 500,50 38,50" />
            </svg>
          </Box>
          <Box
            zIndex={2}
            position="absolute"
            top={0}
            left={0}
            py={3}
            pl={4}
            w="full"
            rounded="lg"
            textAlign="center"
            textStyle="h1"
            as="h1"
          >
            {entity.name} {entity.nameJapanese && <>({entity.nameJapanese})</>}
          </Box>
          <Box
            zIndex={2}
            position="absolute"
            top="42px"
            color="white"
            fontWeight="bold"
            left={0}
            py={3}
            pl={6}
            w="full"
            rounded="lg"
            textAlign="center"
          >
            スモール・キュート・アニマル
          </Box>

          <Flex flexDirection="column" py={6} bg="white" rounded="xl">
            <Center mt="80px" h="128px">
              {entity.pictureUrl ? (
                <Image width={128} height={128} src={entity.pictureUrl ?? ''} />
              ) : (
                <img src={`/api/ogpgen?text=${entity.name}の画像の設定忘れてるよごめんね!`} />
              )}
            </Center>
            <Flex>
              <Flex
                fontWeight="bold"
                alignItems="center"
                roundedRight="lg"
                color="white"
                bg="red.600"
                py={1}
                pl={4}
                pr={3}
                borderWidth="2px"
                borderColor="black"
              >
                <Box
                  mr={2}
                  w="16px"
                  h="16px"
                  backgroundImage={`url(${entity.iconUrl ?? ``})`}
                  backgroundPosition={entity.iconBgPos ?? ''}
                />
                <Box>友好モブ</Box>
              </Flex>
            </Flex>
            <Box fontSize="1.6rem">{entity.rarelity ?? 'レアリティ未設定'}</Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
