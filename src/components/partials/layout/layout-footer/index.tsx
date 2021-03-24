import { CREATOR_ID, VERCEL_LAST_COMMIT, VERCEL_LAST_COMMIT_MESSAGE } from '@/lib/constants';
import { Button, Box, Container, Flex, Stack, useColorMode, Badge } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Logo from '@/components/common/Logo';
import FaiconDiv from '@/components/common/faicon-div';

const pkg = require('../../../../../package.json');
const repoUrl = pkg.repository.url;
const repoV = pkg.version;

interface FooterProps {
  revalidate?: number;
}

const LayoutFooter = ({ revalidate }: FooterProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box w="full" background="gray.700" py={8} color="white" textAlign="center">
      <Container>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Box mb={4}>Powered by</Box>
          <Box mb={4}>
            <Logo fill="white" />
          </Box>
          <Box mb={4}>made with</Box>

          <Stack
            spacing={4}
            mb={6}
            direction={{ base: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              colorScheme="blue"
              leftIcon={
                <div className="w-5 mr-1">
                  <img src="/svg/next-js.svg" width="10" />
                </div>
              }
              href="https://nextjs.org/"
              as={LinkChakra}
            >
              Next.js
            </Button>

            <Button
              colorScheme={colorMode == 'light' ? 'gray' : 'black'}
              href="https://www.contentful.com/"
              as={LinkChakra}
            >
              <img
                src={colorMode == 'light' ? '/svg/contentful-black.svg' : '/svg/contentful.svg'}
                width="100"
              />
            </Button>

            <Button
              colorScheme="teal"
              leftIcon={<FaiconDiv color="white" icon={['fab', 'github']} />}
              href={repoUrl}
              as={LinkChakra}
            >
              GitHub
            </Button>
          </Stack>
          <Box>
            Articles/images: &copy; 2021{` `}
            <LinkChakra href={`https://twitter.com/${CREATOR_ID}`}>{CREATOR_ID}</LinkChakra>
          </Box>
          <Box mb={3}>
            Code of web app: {` `}
            <LinkChakra href={repoUrl}>MIT License</LinkChakra>
          </Box>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Badge colorScheme="green" textTransform="none">
                <a href="/privacy-policy/">プライバシーポリシー</a>
              </Badge>
            </Box>
            {revalidate && (
              <Box>
                <Badge colorScheme="purple" textTransform="none">
                  速度向上のため、このページは{revalidate / 60}分間隔で更新されます
                </Badge>
              </Box>
            )}
            <Box>
              <Badge maxW="20rem" whiteSpace="nowrap" textTransform="none" isTruncated>
                v{repoV} / Last commit:{' '}
                <LinkChakra href={VERCEL_LAST_COMMIT}>{VERCEL_LAST_COMMIT_MESSAGE}</LinkChakra>
              </Badge>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default LayoutFooter;
