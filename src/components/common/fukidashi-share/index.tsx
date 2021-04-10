import { Box, Flex, Button, useColorMode, Badge } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FaiconDiv from '../faicon-div';
import LinkChakra from '../link-chakra';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

interface TocProps {
  tweetCount?: number;
  tweetText?: string;
  commentCount?: number;
  likeCount?: number;
  slug?: string;
}

const FukidashiShare = ({ tweetCount, tweetText, commentCount, likeCount, slug }: TocProps) => {
  const { colorMode } = useColorMode();
  const { asPath } = useRouter();
  const shareUrl = (process.env.HTTPS_URL + asPath) as string;
  const [liked, setLiked] = useState(false);
  let [likeValue, setLikeValue] = useState(likeCount ?? 0);

  const Like = async () => {
    await firebase
      .firestore()
      .collection('blogPosts')
      .doc(slug)
      .set(
        {
          like: firebase.firestore.FieldValue.increment(1),
        },
        { merge: true },
      )
      .then(() => {
        setLikeValue(likeValue + 1);
        console.info(`Added like`);
        setLiked(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fukidashiStyle = {
    '.fukidashiBox': {
      position: 'relative',
      color: '',
      background: colorMode == 'light' ? '#fff' : '#000',
      padding: '7px 14px 7px',
      borderRadius: '10px',
      boxShadow: '0px 1px 5px 3px rgba(0,0,0,0.1)',
    },
    '.fukidashiBox::before': {
      content: "''",
      display: 'block',
      position: 'absolute',
      top: '15px',
      left: '-10px',
      width: '0px',
      height: '0px',
      borderWidth: '5px',
      borderColor: `transparent ${colorMode == 'light' ? '#fff' : '#000'} transparent transparent`,
    },
  };

  const tweetUrl = `https://twitter.com/share?url=${encodeURIComponent(
    shareUrl,
  )}&text=${encodeURIComponent(tweetText ?? '')}`;

  return (
    <>
      <Flex sx={fukidashiStyle} mb={4} alignItems="center">
        <Box mr={2}>
          <Button
            aria-label="ツイートする"
            target="_blank"
            as={LinkChakra}
            href={tweetUrl}
            colorScheme="twitter"
          >
            <FaiconDiv icon={['fab', 'twitter']} />
          </Button>
        </Box>

        <Box
          className="fukidashiBox"
          bg={colorMode == 'dark' ? 'black' : 'white'}
          fontSize="lg"
          mr={6}
        >
          {tweetCount ?? 0}
        </Box>

        {commentCount && (
          <>
            <Box mr={2}>
              <Button aria-label="コメントする" as="a" href="#a_comment" colorScheme="orange">
                <FaiconDiv icon={['fas', 'comment-alt']} />
              </Button>
            </Box>
            <Box
              className="fukidashiBox"
              sx={fukidashiStyle}
              bg={colorMode == 'dark' ? 'black' : 'white'}
              fontSize="lg"
            >
              {commentCount ?? 0}
            </Box>
          </>
        )}

        <>
          <Box mr={2}>
            <Button
              cursor="pointer"
              disabled={liked}
              aria-label="いいねする"
              as="a"
              onClick={Like}
              colorScheme="pink"
            >
              <FaiconDiv icon={['fas', 'heart']} />
            </Button>
          </Box>
          <Box
            className="fukidashiBox"
            sx={fukidashiStyle}
            bg={colorMode == 'dark' ? 'black' : 'white'}
            fontSize="lg"
          >
            {likeValue}
          </Box>
        </>
      </Flex>
      {liked && <Badge>いいねしてくれてありがとう！</Badge>}
    </>
  );
};

export default FukidashiShare;
