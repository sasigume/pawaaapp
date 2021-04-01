import { Box, Center, Flex, useColorMode } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import { Entity } from '@/models/nest/Entity';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import duemaDescStyle from '@/styles/duema-desc-styles.module.css';

interface Props {
  entity: Entity;
}

export function SingleEntityComponent({ entity }: Props) {
  const duemaBorder = {
    borderWidth: '2px',
    borderColor: 'black',
  };

  const { colorMode } = useColorMode();
  let entityType = 'エンティティ';
  if (entity.type == 'friendly') {
    entityType = '友好モブ';
  }
  if (entity.type == 'hostile') {
    entityType = '敵対モブ';
  }
  if (entity.type == 'passive') {
    entityType = '中立モブ';
  }
  return (
    <>
      <Box
        w="300px"
        h="420px"
        mx="auto"
        bg="black"
        mb={8}
        fontSize="12px"
        direction="column"
        position="relative"
        rounded="lg"
        overflow="hidden"
      >
        <Center
          zIndex={10}
          position="absolute"
          top="8px"
          left="8px"
          bg="red.600"
          color="white"
          fontWeight="bold"
          fontSize="28px"
          fontFamily="mono"
          textShadow="1px 1px 1px #000"
          w="50px"
          h="50px"
          {...duemaBorder}
          rounded="full"
        >
          {entity.dec && entity.dec}
        </Center>
        <Box position="relative" m="16px" rounded="lg" fontWeight="bold">
          <>
            {/* HEADER */}
            <Box overflow="hidden" w="full" zIndex={1} position="absolute" top={0} left={0}>
              <svg width="100%" height="100%" viewBox="0 0 300 100">
                <polygon fill="black" points="10,0 300,0 300,70 40,70" />
                <polygon fill="white" points="10,3 300,3 300,50 38,50" />
              </svg>
            </Box>
            <Box
              zIndex={2}
              color="black"
              h="full"
              position="absolute"
              top="8px"
              left={0}
              ml="15px"
              w="full"
              fontSize="20px"
              textAlign="center"
              as="h2"
            >
              {entity.nameJapanese ? entity.nameJapanese : entity.name}
            </Box>
            <Box
              zIndex={2}
              position="absolute"
              top="44px"
              color="white"
              fontWeight="bold"
              left={0}
              ml="16px"
              w="full"
              fontSize="11px"
              textAlign="center"
            >
              スモール・キュート・{entityType}
            </Box>
          </>

          <>
            {/* POWER */}
            <Box overflow="hidden" w="full" zIndex={1} position="absolute" bottom={0} left={0}>
              <svg width="100%" height="100%" viewBox="0 0 300 40">
                <polygon fill="#black" points="0,0 95,0 115,35 300,35 300,50 0,50" />
                <polygon fill="#b22" points="0,2 94,2 114,37 300,37 300,50 0,50" />
                <polygon fill="black" points="0,6 92,6 112,41 300,41 300,50 0,50" />
              </svg>
            </Box>
            <Center
              zIndex={10}
              position="absolute"
              bottom="-7px"
              left="5px"
              color="white"
              fontWeight="bold"
              fontSize="26px"
              fontFamily="mono"
            >
              {entity.dec && entity.dec * 100}
            </Center>
          </>

          <Flex justifyContent="center" pt="80px" h="388px" bg="orange.100">
            {entity.pictureUrl ? (
              <Box position="relative" w="128px" h="128px">
                <Image layout="fill" objectFit="contain" src={entity.pictureUrl ?? ''} />
              </Box>
            ) : (
              <img src={`/api/ogpgen/?text=${entity.name}の画像の設定忘れてるよごめんね!`} />
            )}
          </Flex>
        </Box>
        <Box
          position="absolute"
          left={0}
          bottom={0}
          h="145px"
          roundedBottom="lg"
          bg={
            colorMode == 'light'
              ? ' linear-gradient(#fff 80%,#ebb 100%)'
              : 'linear-gradient(#000 70%,#822 100%)'
          }
          color={colorMode == 'light' ? ' black' : 'white'}
          w="268px"
          m="16px"
          fontSize="12px"
        >
          <Box position="relative">
            <Flex zIndex={10} position="absolute" top="-20px">
              <Box
                display="flex"
                fontWeight="bold"
                alignItems="center"
                roundedRight="lg"
                color="white"
                bg="red.600"
                py="2px"
                ml="-2px"
                pr="10px"
                {...duemaBorder}
              >
                <Box
                  ml="4px"
                  mr="4px"
                  w="16px"
                  h="16px"
                  backgroundImage={`url(${entity.iconUrl ?? ``})`}
                  backgroundPosition={entity.iconBgPos ?? ''}
                />
                <Box>{entityType}</Box>
              </Box>
              <Box flexGrow={1}>{``}</Box>
            </Flex>
          </Box>
          <Box mt="14px" pr="10px">
            <ReactMarkdown
              className={
                colorMode == 'light' ? duemaDescStyle['duema'] : duemaDescStyle['duemadark']
              }
            >
              {entity.description ? entity.description.replace(/\\n/g, '\n') : ''}
            </ReactMarkdown>
          </Box>
        </Box>
        <Box
          zIndex={10}
          fontSize="10px"
          position="absolute"
          bottom="23px"
          right={0}
          mr="30px"
          colorz="white"
        >
          <span>
            {entity.hex ?? ''}-{entity.dec ?? ''}
          </span>
          {` `}
          {entity.rarelity ?? 'No rarelity'}
        </Box>

        {/* MANA */}
        <Center zIndex={10} position="absolute" bottom="6px" w="300px">
          <Center
            bg="red.600"
            color="white"
            fontWeight="bold"
            fontSize="24px"
            fontFamily="mono"
            textShadow="1px 1px 1px #000"
            w="40px"
            h="40px"
            {...duemaBorder}
            transform="rotate(180deg)"
            rounded="full"
          >
            {entity.dec && entity.dec.toString().slice(0, 1)}
          </Center>
        </Center>
      </Box>
    </>
  );
}
