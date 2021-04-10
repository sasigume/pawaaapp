import dayjs from 'dayjs';
import { Badge, Box, Center, Flex, useColorMode } from '@chakra-ui/react';
import { PostForList } from '@/models/contentful/Post';

import LinkChakra from '@/components/common/link-chakra';

interface Props {
  post: PostForList;
  mode?: 'archive' | 'more' | 'drawer' | undefined;
}
export function CompactPost({ post, mode }: Props) {
  const { colorMode } = useColorMode();
  return (
    <LinkChakra href={`/${post.slug}`}>
      {/*<LinkChakra href={`/${post.slug}`}>*/}
      <Flex
        bg={colorMode == 'light' ? 'white' : 'gray.900'}
        rounded="xl"
        shadow="lg"
        p={3}
        alignItems="center"
        area-label={post.title}
      >
        <Box flexGrow={1}>
          <Center
            rounded="lg"
            bg="linear-gradient(#2687e8, #2655ff)"
            mb={2}
            h={32}
            overflow="hidden"
          >
            {post.heroImage ? (
              <img src={post.heroImage.url} width="full" height="auto" />
            ) : (
              <Badge>No Image</Badge>
            )}
          </Center>

          <Box
            position="relative"
            fontSize={{ base: '18px', md: '20px' }}
            fontWeight="bold"
            mb={2}
            h={mode == 'drawer' ? '90px' : '100px'}
            overflow="hidden"
            w="full"
            isTruncated
            whiteSpace="normal"
          >
            {post.title}
          </Box>
          {mode != 'drawer' && (
            <>
              {' '}
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
            </>
          )}
        </Box>
      </Flex>
      {/*</LinkChakra>*/}
    </LinkChakra>
  );
}
