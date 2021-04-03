import { SITE_NAME } from '@/lib/constants';
import { Box, BoxProps, HStack } from '@chakra-ui/layout';
import Image from 'next/image';
import LinkChakra from './link-chakra';

const SiteLogo: React.FC<BoxProps> = (props) => (
  <Box {...props} minW="200px" style={{ marginLeft: 0 }}>
    <LinkChakra fontWeight="bold" href="/">
      <HStack>
        <Box mt={-1} mr={2} w={10} h={10}>
          <Image src="/icon-180x.png" width={80} height={80} />
        </Box>

        <Box textAlign="left" as="h1" fontSize={16}>
          {SITE_NAME}
        </Box>
      </HStack>
    </LinkChakra>
  </Box>
);

export default SiteLogo;
