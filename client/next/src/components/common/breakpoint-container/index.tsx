import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  breakpointName?: string;
  actualWidth?: any;
}

export default function BreakpointContainer({ children, breakpointName, actualWidth }: Props) {
  return (
    <Box
      mx="auto"
      px={{ base: 3, [breakpointName ?? 'md']: 0 }}
      maxWidth={{ base: '100vw', [breakpointName ?? 'md']: actualWidth ?? '650px' }}
      overflowX="hidden"
    >
      <Flex w="full" overflowX="hidden" direction="column">
        {children}
      </Flex>
    </Box>
  );
}
