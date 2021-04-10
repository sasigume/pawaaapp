import {
  Box,
  Flex,
  Button,
  useColorMode,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FaiconDiv from '../faicon-div';
import LinkChakra from '../link-chakra';
import firebase from 'firebase/app';
import { useRef, useState } from 'react';

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

  const alertRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const onCloseAlert = () => setAlertOpen(false);

  let [likeValue, setLikeValue] = useState(likeCount ?? 0);

  const Like = async () => {
    setAlertOpen(true);
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
          mr={6}
        >
          {tweetCount ?? 0}
        </Box>

        {commentCount && (
          <>
            <Box>
              <Button aria-label="コメントする" as="a" href="#a_comment" colorScheme="orange">
                <FaiconDiv icon={['fas', 'comment-alt']} />
              </Button>
            </Box>
            <Box
              ml={2}
              className="fukidashiBox"
              sx={fukidashiStyle}
              bg={colorMode == 'dark' ? 'black' : 'white'}
              fontSize="lg"
            >
              {commentCount ?? 0}
            </Box>
          </>
        )}

        {likeCount && (
          <>
            <Box>
              <Button
                ref={alertRef}
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
              ml={2}
              className="fukidashiBox"
              sx={fukidashiStyle}
              bg={colorMode == 'dark' ? 'black' : 'white'}
              fontSize="lg"
            >
              {likeValue}
            </Box>
          </>
        )}
      </Flex>
      <AlertDialog leastDestructiveRef={alertRef} isOpen={alertOpen} onClose={onCloseAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              いいねしてくれてありがとう！
            </AlertDialogHeader>

            <AlertDialogBody>
              リロードすると数字が元に戻りますが、数十分後に集計されるのでご安心ください。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onCloseAlert} ml={3}>
                閉じる
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default FukidashiShare;
