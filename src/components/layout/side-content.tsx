import { SITE_FULL_URL } from '@/lib/constants';
import { Post } from '@/models/contentful/Post';
import tocStyles from '@/styles/markdown-toc-styles.module.css';
import { Button } from '@chakra-ui/button';
import { Box, VStack } from '@chakra-ui/layout';
import ReactMarkdownHeading from 'react-markdown-heading';
import AdsenseBox from '../common/adsense-box';
import FaiconDiv from '../common/faicon-div';
import FukidashiShare from '../common/fukidashi-share';
import LikeDislike from '../common/like-dislike';
import LinkChakra from '../common/link-chakra';

interface SideContentProps {
  post?: Post;
  hideAdsense?: boolean;
}

const SideContent = ({ post, hideAdsense }: SideContentProps) => {
  return (
    <VStack alignItems="start">
      {hideAdsense != true && (
        <>
          <AdsenseBox width={300} height={250} layout="fixed" slot={'8321176059'} />
        </>
      )}
      {post && (
        <>
          <Box py={4}>
            <FukidashiShare
              tweetCount={post.tweetCount ?? 0}
              tweetText={`${post.title}\n${SITE_FULL_URL}/${post.slug}`}
            />
          </Box>
          <Box py={2}>
            <LikeDislike likeCount={post.like ?? 0} dislikeCount={post.dislike ?? 0} />
          </Box>
          <Box py={8} className={tocStyles['toc']}>
            <ReactMarkdownHeading markdown={post.body} hyperlink />
          </Box>
        </>
      )}

      <Button leftIcon={<FaiconDiv icon={['fas', 'book']} />} as={LinkChakra} href="/eula/">
        利用規約
      </Button>
    </VStack>
  );
};

export default SideContent;
