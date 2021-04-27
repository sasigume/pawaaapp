import { Box, Flex, Button } from '@chakra-ui/react';
import FaiconDiv from './faicon-div';
import { useRef, useState } from 'react';

interface TocProps {
  likeCount?: number;
  dislikeCount?: number;
  slug?: string;
}

const LikeDislike = ({ likeCount, dislikeCount, slug }: TocProps) => {
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

  return (
    <Box w="full">
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
    </Box>
  );
};

export default LikeDislike;
