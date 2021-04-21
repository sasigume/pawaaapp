import dayjs from 'dayjs';
import { Badge, Box, Flex, Spacer, VStack } from '@chakra-ui/react';
import { Post } from '@/models/contentful/Post';

import PlatformList from '../common/platform-list';
import PersonList from '../common/person-list';
import LinkChakra from '@/components/common/link-chakra';
import Image from 'next/image';
import FukidashiShare from '@/components/common/fukidashi-share';
import LikeDislike from '@/components/common/like-dislike';
import { SITE_FULL_URL } from '@/lib/constants';
interface Props {
  post: Post;
}
const PostHeading = ({ post }: Props) => {
  return (
    <Box>
      {post.heroImage && (
        <Box mb={6}>
          <Image src={post.heroImage.url} width={650} height={365} layout="responsive" />
        </Box>
      )}
      <Flex mb={2}>
        <Badge area-label="公開日時" colorScheme="blue" fontSize="1.1rem">
          公開: {dayjs(post.publishDate ?? post.sys.firstPublishedAt).format('YYYY/MM/DD')}
        </Badge>
        <Badge area-label="更新日時" colorScheme="green" fontSize="1.1rem">
          最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD')}
        </Badge>
      </Flex>
      <Box textStyle="h1" mb={4}>
        <LinkChakra href={`/${post.slug}`}>
          <h1>{post.title}</h1>
        </LinkChakra>
      </Box>

      {post.platformsCollection?.items && post.platformsCollection.items.length > 0 && (
        <Box mb={4}>
          <PlatformList mode="wrap" platforms={post.platformsCollection.items} />
        </Box>
      )}

      {!post.publishDate && (
        <Badge colorScheme="red">編集担当へ: 並び替え用の公開日を設定し忘れています!</Badge>
      )}
      <VStack>
        {post.person && <PersonList persons={[post.person]} />}
        <Spacer />
        <FukidashiShare
          tweetCount={post.tweetCount ?? 0}
          tweetText={`${post.title}\n${SITE_FULL_URL}/${post.slug}`}
        />
        <LikeDislike likeCount={post.like ?? 0} dislikeCount={post.dislike ?? 0} />
      </VStack>
    </Box>
  );
};

export default PostHeading;
