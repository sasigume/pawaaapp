import { HStack, Box, Switch, useColorMode } from '@chakra-ui/react';
import FaiconDiv from '@/components/common/faicon-div';

const ColorSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack my={4}>
      <Box>
        {colorMode === 'light' ? (
          <FaiconDiv icon={['fas', 'sun']} />
        ) : (
          <FaiconDiv icon={['fas', 'moon']} />
        )}
      </Box>
      <Switch
        aria-label="カラーモードを切り替える"
        isChecked={colorMode == 'dark'}
        onChange={toggleColorMode}
      />
    </HStack>
  );
};

export default ColorSwitch;
