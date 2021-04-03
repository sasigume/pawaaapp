import { Box, Stack } from '@chakra-ui/layout';
import LinkChakra from './link-chakra';
import { Button } from '@chakra-ui/button';

interface Props {
  totalCount: number;
}

// https://blog.microcms.io/next-pagination/

const Pagination = ({ totalCount }: Props) => {
  const PER_PAGE = parseInt(process.env.PAGINATION ?? '10');

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <Box sx={{ '.noScrollBar::-webkit-scrollbar': { display: 'none' } }}>
      <Stack direction="row" className="noScrollBar" my={8} w="full" overflowX="scroll">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <LinkChakra key={index} href={`/postpage/${number}`}>
            <Button colorScheme="blue">{number}</Button>
          </LinkChakra>
        ))}
      </Stack>
    </Box>
  );
};

export default Pagination;
