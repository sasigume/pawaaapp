import { Box, Flex, Button, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FaiconDiv from '../faicon-div';
import LinkChakra from '../link-chakra';
import { useRef, useState } from 'react';

interface TocProps {
  tweetCount?: number;
  tweetText?: string;
  likeCount?: number;
  dislikeCount?: number;
  slug?: string;
  onlyTwitter?: boolean;
}

const FukidashiShare = ({
  tweetCount,
  tweetText,
  likeCount,
  dislikeCount,
  slug,
  onlyTwitter,
}: TocProps) => {
  const { colorMode } = useColorMode();
  const { asPath } = useRouter();
  const shareUrl = (process.env.HTTPS_URL + asPath) as string;

  const alertRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const pressed = liked || disliked;

  // カウントは最初の値で、バリューが表示用の変化する値

  let [likeValue, setLikeValue] = useState(likeCount ?? 0);
  let [dislikeValue, setDislikeValue] = useState(dislikeCount ?? 0);

  const ratio = (likeValue / (likeValue + dislikeValue)) * 100;
  let noRatio = false;
  if (likeValue + dislikeValue == 0) {
    noRatio = true;
  }

  const Like = async () => {
    if (!liked) {
      await fetch(process.env.HTTPS_URL + '/api/editBlogPosts/like?slug=' + slug)
        .then((res) => {
          if (res.status == 200) {
            setLikeValue((prevValue) => prevValue + 1);
            console.info(`Added like: ${JSON.stringify(res)}`);
            setLiked(true);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const Dislike = async () => {
    if (!disliked) {
      await fetch(process.env.HTTPS_URL + '/api/editBlogPosts/dislike?slug=' + slug)
        .then((res) => {
          if (res.status == 200) {
            setDislikeValue((prevValue) => prevValue + 1);
            console.info(`Added dislike: ${JSON.stringify(res)}`);
            setDisliked(true);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
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
        <Box>
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
          ml={2}
          className="fukidashiBox"
          bg={colorMode == 'dark' ? 'black' : 'white'}
          fontSize="lg"
        >
          {tweetCount ?? 0}
        </Box>
      </Flex>
      {!onlyTwitter && (
        <>
          <Flex justifyContent="space-between" fontWeight="bold" w="full" position="relative">
            <Box>
              <Button
                ref={alertRef}
                cursor="pointer"
                isActive={!pressed}
                disabled={pressed}
                aria-label="高評価する"
                as="a"
                onClick={Like}
                color={liked ? 'blue' : 'gray.500'}
                colorScheme="whiteAlpha"
              >
                <FaiconDiv w={'22px'} icon={['fas', 'thumbs-up']} />
              </Button>
              高評価 {likeValue}
            </Box>
            <Box>
              低評価 {dislikeValue}
              <Button
                ref={alertRef}
                cursor="pointer"
                isActive={!pressed}
                disabled={pressed}
                aria-label="低評価する"
                as="a"
                onClick={Dislike}
                color={disliked ? 'red' : 'gray.500'}
                colorScheme="whiteAlpha"
              >
                <FaiconDiv w={'22px'} icon={['fas', 'thumbs-down']} />
              </Button>
            </Box>
          </Flex>
          <Flex w="full" h={3}>
            {noRatio ? (
              <>
                <Box w="50%" h="full" bg="gray.300"></Box>
                <Box w="50%" h="full" bg="gray.300"></Box>
              </>
            ) : (
              <>
                <Box w={noRatio ? 50 : `${ratio}%`} h="full" bg="blue.500"></Box>
                <Box w={`${100 - ratio}%`} h="full" bg="red.500"></Box>
              </>
            )}
          </Flex>
        </>
      )}
    </>
  );
};

export default FukidashiShare;
