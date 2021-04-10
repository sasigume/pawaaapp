import { PostComment } from '@/models/firebase/PostComment';
import { Box, Flex, Stack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Props {
  c: PostComment;
}

export default function PostCommentSingle({ c }: Props) {
  return (
    <Box
      border="solid"
      borderWidth={1}
      shadow="lg"
      borderColor="gray.300"
      mb={4}
      p={6}
      rounded="xl"
    >
      <Stack spacing={2}>
        <Flex>
          <Box w={8} mr={3} overflow="hidden">
            <Image src={c.photoURL ? c.photoURL : '/icon-180x.png'} width={32} height={32} />
          </Box>
          <Box>{c.senderName}さん</Box>
        </Flex>
        <ReactMarkdown source={c.body} />
        <div className="text-sm text-right">
          <small>{dayjs(c.createdAt._seconds * 1000).format('YYYY/MM/DD HH:mm:ss')}</small>
        </div>
      </Stack>
    </Box>
  );
}
