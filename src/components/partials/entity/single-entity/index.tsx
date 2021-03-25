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
      <Box mb={8} px={0} direction="column">
        <Box textStyle="h1" as="h1" mb={8}>
          {entity.name}
        </Box>

        <Center flexDirection="column" p={6} bg="orange.100" rounded="xl">
          {entity.pictureUrl ? (
            <Image width={128} height={128} src={entity.pictureUrl ?? ''} />
          ) : (
            <img src={`/api/ogpgen?text=${entity.name}の画像の設定忘れてるよごめんね!`} />
          )}
          <Flex alignItems="center" textStyle="h3">
            <Box
              mr={2}
              w="16px"
              h="16px"
              backgroundImage={`url(${entity.iconUrl ?? ``})`}
              backgroundPosition={entity.iconBgPos ?? ''}
            />
            <Box fontSize="1.6rem">
              {entity.name} ({entity.nameJapanese ?? '日本語名未設定'})
            </Box>
          </Flex>
          <Box fontSize="1.6rem">{entity.rarelity ?? 'レアリティ未設定'}</Box>
        </Center>
      </Box>
    </>
  );
}
