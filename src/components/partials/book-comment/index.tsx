
import MarkdownRender from '@/components/common/MarkdownRender'
import { BookComment } from '@/models/firebase/BookComment'
import { Box, Stack } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface Props {
  c: BookComment
}

export default function BookCommentComponent({ c }: Props) {
  return (
    <Box border="solid" borderWidth={1} shadow="lg" borderColor="gray.300" mb={4} p={6} rounded="xl">
      <Stack spacing={2}>
        <div>{c.senderName}さん:</div>
        <MarkdownRender source={c.body} />
        <div className="text-sm text-right">
          <small>{dayjs(c.createdAt._seconds * 1000).format('YYYY/MM/DD HH:mm:ss')}</small>
        </div>
      </Stack>
    </Box>
  )
}