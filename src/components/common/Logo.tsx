import LinkChakra from '@/components/common/link-chakra';
import { Box } from '@chakra-ui/react';

interface Props {
  fill?: string;
}

const Logo = ({ fill = 'black' }: Props) => {
  return (
    <Box area-label="ロゴ" fontWeight="bold">
      <LinkChakra isExternal href="https://boron.uno">
        BORONUNO
      </LinkChakra>
    </Box>
  );
};

export default Logo;
