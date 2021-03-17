
import { PostComment } from '@/models/firebase/PostComment'
import { Box, Stack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'

interface Props {
  c: PostComment
}

export default function PostCommentComponent({ c }: Props) {
  return (
    <Box border="solid" borderWidth={1} shadow="lg" borderColor="gray.300" mb={4} p={6} rounded="xl">
      <Stack spacing={2}>
        <div>{c.senderName}さん:</div>
        <ReactMarkdown children={c.body} />
        <div className="text-sm text-right">
          <small>{dayjs(c.createdAt._seconds * 1000).format('YYYY/MM/DD HH:mm:ss')}</small>
        </div>
      </Stack>
    </Box>
  )
}