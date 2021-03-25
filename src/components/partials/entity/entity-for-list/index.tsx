import { Box, Flex } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import { Entity } from '@/models/nest/Entity';
import Image from 'next/image';

interface Props {
  entity: Entity;
}

export function EntityForList({ entity }: Props) {
  return (
    <LinkChakra href={`/entityatsume/zukan/${entity.bedrockId}`}>
      <Flex rounded="xl" shadow="lg" p={3} alignItems="center" area-label={entity.name}>
        <Box flexGrow={1}>
          {entity.pictureUrl && <Image width={128} height={128} src={entity.pictureUrl ?? ''} />}
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
        </Box>
      </Flex>
    </LinkChakra>
  );
}
