import dayjs from 'dayjs'
import { Badge, Box, Center, Flex } from '@chakra-ui/react'
import { Post } from '@/models/contentful/Post'

import LinkChakra from '@/components/common/link-chakra'

interface Props {
  post: Post
}
export function PostForList({ post }: Props) {
  return (
    <Flex rounded="xl" shadow="lg" p={3} alignItems="center" area-label={post.title}>
      <Box flexGrow={1}>
        <Box textStyle="h4" mb={2}>
          <LinkChakra href={`/${post.slug}`}>
            {post.title}
          </LinkChakra>
        </Box>
        <Box area-label="更新日時">
          <Badge colorScheme="blue">公開: {dayjs(post.sys.firstPublishedAt).format('YYYY/MM/DD')}</Badge>
          <Badge colorScheme="green">最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD')}</Badge>
        </Box>
      </Box>
    </Flex>
  )
}