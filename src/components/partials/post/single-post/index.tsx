import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { Badge, Box, Button, Divider } from '@chakra-ui/react';
import { Post } from '@/models/contentful/Post';

// issue #106
/*const LinkChakra = dynamic(() => import('@/components/common/link-chakra'));
const PlatformList = dynamic(() => import('../common/platform-list'));
const PersonList = dynamic(() => import('../common/person-list'));
const Adsense = dynamic(() => import('@/components/common/adsense'));
const MarkdownRender = dynamic(() => import('@/components/common/MarkdownRender'));
const FaiconDiv = dynamic(() => import('@/components/common/faicon-div'));*/
import LinkChakra from '@/components/common/link-chakra';
import PlatformList from '../common/platform-list';
import PersonList from '../common/person-list';
import Adsense from '@/components/common/adsense';
import MarkdownRender from '@/components/common/MarkdownRender';
import FaiconDiv from '@/components/common/faicon-div';

interface Props {
  post: Post;
}

export function SinglePostComponent({ post }: Props) {
  return (
    <>
      <Box>
        {post.person && (
          <Box>
            <PersonList persons={[post.person]} />
          </Box>
        )}
        {post.platformsCollection?.items && post.platformsCollection.items.length > 0 && (
          <Box>
            <PlatformList platforms={post.platformsCollection.items} />
          </Box>
        )}

        {!post.publishDate && (
          <Badge colorScheme="red">編集担当へ: 並び替え用の公開日を設定し忘れています!</Badge>
        )}

        <Box area-label="更新日時" mb={6}>
          <Badge colorScheme="blue">
            公開: {dayjs(post.publishDate ?? post.sys.firstPublishedAt).format('YYYY/MM/DD')}
          </Badge>
          <Badge colorScheme="green">
            最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD')}
          </Badge>
        </Box>
      </Box>

      <Box px={0} direction="column">
        <Box textStyle="h1" mb={4}>
          <LinkChakra href={`/${post.slug}`}>
            <h1>{post.title}</h1>
          </LinkChakra>
        </Box>
        <Badge colorScheme="cyan" mb={4}>
          ID: {post.sys.id}
        </Badge>
        <Box
          display={{ base: 'none', md: 'flex' }}
          area-label="記事の概要"
          my={4}
          fontSize="1.4rem"
        >
          {post.description}
        </Box>
        {post.hideAdsense !== true && <Adsense slot={'1773582608'} />}
        <Divider my={4} />
        <Box>
          <MarkdownRender source={post.body} />
        </Box>
        <Divider my={3} />
        <Box>
          <Button
            h="60px"
            w="full"
            aria-label="フォロー"
            target="_blank"
            as={LinkChakra}
            href="https://twitter.com/sasigume"
            colorScheme="twitter"
            leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}
          >
            記事がお役にたったら...
            <br />
            フォローをお願いします
          </Button>
        </Box>
        <Divider my={3} />
        {post.hideAdsense !== true && <Adsense slot={'1529491287'} />}
      </Box>
    </>
  );
}
