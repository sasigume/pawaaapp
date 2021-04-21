import { CREATOR_ID, VERCEL_LAST_COMMIT, VERCEL_LAST_COMMIT_MESSAGE } from '@/lib/constants';
import { Button, Box, Container, Flex, Stack, useColorMode, Badge } from '@chakra-ui/react';
import LinkChakra from '@/components/common/link-chakra';
import Logo from '@/components/common/Logo';

const pkg = require('../../../../package.json');
const repoUrl = pkg.repository.url;
const repoV = pkg.version;

interface FooterProps {
  revalidate?: number;
  maxW: number;
}

const LayoutFooter = ({ revalidate, maxW }: FooterProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box as="footer" w="full" background="gray.700" py={8} color="white">
      <Container maxW={`${maxW}px`}>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          px={{ base: 3, lg: 0 }}
        >
          <Box pr={6}>
            <Box mb={4}>Powered by</Box>
            <Box mb={4}>
              <Logo fill="white" />
            </Box>
            <Box mb={4}>made with</Box>

            <Flex flexWrap="wrap" spacing={4} mb={6}>
              <Button
                colorScheme="blue"
                leftIcon={
                  <div className="w-5 mr-1">
                    <img src="/svg/next-js.svg" width="10" />
                  </div>
                }
                href="https://nextjs.org/"
                as={LinkChakra}
                mr={2}
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
            </Flex>
          </Box>
          <Box textAlign="right">
            <Box>
              Articles/images: &copy; 2021{` `}
              <LinkChakra href={`https://twitter.com/aelyone`}>Aelyone</LinkChakra>
            </Box>
            <Box mb={3}>
              Code of web app: {` `}
              <LinkChakra href={repoUrl}>MIT License</LinkChakra>
            </Box>
            <Stack direction="column">
              <Box>
                <Badge colorScheme="green" textTransform="none">
                  <a href="/privacy-policy/">プライバシーポリシー</a>
                </Badge>
              </Box>
              {revalidate && (
                <Box>
                  <Badge colorScheme="purple" textTransform="none">
                    速度向上のため、記事の内容は{revalidate / 60}分間変わりません
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
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LayoutFooter;
