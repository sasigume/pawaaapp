import { Box, Button, Divider } from '@chakra-ui/react';
import { Post } from '@/models/contentful/Post';

import LinkChakra from '@/components/common/link-chakra';
import MarkdownRender from '@/components/common/MarkdownRender';
import FaiconDiv from '@/components/common/faicon-div';
import PostHeading from './post-heading';
import AdsenseBox from '@/components/common/adsense';

interface Props {
  post: Post;
  tweetCount?: number;
}

export function SinglePostComponent({ post, tweetCount }: Props) {
  return (
    <>
      <Box>
        <PostHeading post={post} tweetCount={tweetCount ?? 0} />
        {post.hideAdsense !== true && <AdsenseBox slot={'1773582608'} />}
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
        {post.hideAdsense !== true && <AdsenseBox slot={'1529491287'} />}
      </Box>
    </>
  );
}
