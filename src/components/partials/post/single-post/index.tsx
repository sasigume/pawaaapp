import { Box, Button, Divider } from '@chakra-ui/react';
import { Post } from '@/models/contentful/Post';

import LinkChakra from '@/components/common/link-chakra';
import PostBody from './post-body';
import FaiconDiv from '@/components/common/faicon-div';
import PostHeading from './post-heading';
import AdsenseBox from '@/components/common/adsense-box';

interface Props {
  post: Post;
  tweetCount?: number;
  likeCount?: number;
  dislikeCount?: number;
}

export function SinglePostComponent({ post, tweetCount, likeCount, dislikeCount }: Props) {
  return (
    <>
      <Box as="article">
        <PostHeading
          post={post}
          tweetCount={tweetCount ?? 0}
          likeCount={likeCount ?? 0}
          dislikeCount={dislikeCount ?? 0}
        />
        {/* タイトル下 */}
        {post.hideAdsense !== true && <AdsenseBox layout="responsive" slot={'1773582608'} />}
        <Divider my={4} />
        <Box>
          <PostBody style={post.style} source={post.body} />
        </Box>
        <Divider my={3} />
        <Box>
          {post.person && (
            <Button
              h="60px"
              w="full"
              aria-label="フォロー"
              target="_blank"
              as={LinkChakra}
              href={`https://twitter.com/${post.person?.twitterId ?? 'sasigume'}`}
              colorScheme="twitter"
              leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}
            >
              記事がお役にたったら...
              <br />
              フォローをお願いします
            </Button>
          )}
        </Box>
        <Box mt={6}>
          <Button
            w="full"
            aria-label="コメント一覧"
            as={LinkChakra}
            href={`/${post.slug}/comments`}
            colorScheme="orange"
            leftIcon={<FaiconDiv icon={['fas', 'comment-alt']} />}
          >
            コメントを見る
          </Button>
        </Box>

        <Divider my={3} />

        {/* 記事下 */}
        {post.hideAdsense !== true && <AdsenseBox layout="responsive" slot={'1529491287'} />}
      </Box>
    </>
  );
}
