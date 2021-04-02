import { Platform } from '@/models/contentful/Platform';
import LinkChakra from '@/components/common/link-chakra';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import FaiconDiv from '@/components/common/faicon-div';

interface Props {
  platform: Platform;
  mode?: 'wrap';
}

interface ListProps {
  platforms: Platform[];
  heading?: boolean;
  mode?: 'wrap';
}

const OnePlatform = ({ platform, mode }: Props) => {
  let iconStyle, iconName;

  if (platform.icon) {
    iconStyle = platform.icon.style;
    iconName = platform.icon.name;
  } else {
    iconStyle = 'fas' as IconPrefix;
    iconName = 'question' as IconName;
  }

  return (
    <Button
      mr={2}
      fontSize={{ base: '0.8rem', sm: '1rem' }}
      mb={2}
      href={`/platforms/${platform.slug}`}
      colorScheme={platform.bgColor ?? 'green'}
      as={LinkChakra}
      leftIcon={<FaiconDiv icon={[iconStyle, iconName]} />}
    >
      <Box>{platform.displayName}</Box>
    </Button>
  );
};

const PlatformList = ({ platforms, heading, mode }: ListProps) => {
  return (
    <Box>
      {heading && (
        <Heading fontSize="1.6rem" m={2} mt={8} as="h2">
          機種から記事を探す
        </Heading>
      )}
      <Flex flexWrap="wrap" flexDirection={mode == 'wrap' ? 'row' : 'column'}>
        {platforms.reverse().map((s: Platform) => (
          <OnePlatform mode={mode} platform={s} key={s.slug} />
        ))}
      </Flex>
    </Box>
  );
};

export default PlatformList;
