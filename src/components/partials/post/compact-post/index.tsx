import dayjs from 'dayjs';
import { Badge, Box, Center, Flex } from '@chakra-ui/react';
import { PostForList } from '@/models/contentful/Post';

import LinkChakra from '@/components/common/link-chakra';

interface Props {
  post: PostForList;
}
export function CompactPost({ post }: Props) {
  return (
    <LinkChakra href={`/${post.slug}`}>
      <Flex rounded="xl" shadow="lg" p={3} alignItems="center" area-label={post.title}>
        <Box flexGrow={1}>
          {post.heroImage && (
            <Center mb={2}>
              <img src={post.heroImage.url} width="full" height="auto" />
            </Center>
          )}
          <Box textStyle="h4" mb={2}>
            {post.title}
          </Box>
          <Box area-label="更新日時">
            <Badge colorScheme="blue">
              公開: {dayjs(post.publishDate ?? post.sys.firstPublishedAt).format('YYYY/MM/DD')}
            </Badge>
            <Badge colorScheme="green">
              最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD')}
            </Badge>
          </Box>

          {!post.publishDate && (
            <Badge colorScheme="red">編集担当へ: 並び替え用の公開日を設定し忘れています!</Badge>
          )}
        </Box>
      </Flex>
    </LinkChakra>
  );
}
