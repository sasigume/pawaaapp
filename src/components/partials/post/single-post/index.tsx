import dayjs from 'dayjs'
import { Badge, Box, Button, Center, Divider, Flex } from '@chakra-ui/react'
import { Post } from '@/models/contentful/Post'

import LinkChakra from '@/components/common/link-chakra'

import PlatformList from '../common/platform-list'
import PersonList from '../common/person-list'
import Adsense from '@/components/common/adsense'
import MarkdownRender from '@/components/common/MarkdownRender'
import FaiconDiv from '@/components/common/faicon-div'

interface Props {
  post: Post
}

export function SinglePostComponent({ post }: Props) {

  return (
    <>
      <Box>

        {post.heroImage && <Center w="full" mb={4}>
          <img src={post.heroImage.url} width="600px" height="auto" />
          </Center>}

        {post.person && (<Box>
          <PersonList persons={[post.person]} />
        </Box>)}

        <Button aria-label="フォロー" target="_blank" as={LinkChakra} href="https://twitter.com/sasigume" colorScheme="twitter" leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}>
        フォローしてね!
        </Button>

        <Box area-label="更新日時" mb={6}>
          <Badge colorScheme="blue">公開: {dayjs(post.publishDate ?? post.sys.firstPublishedAt).format('YYYY/MM/DD')}</Badge>
          <Badge colorScheme="green">最終更新: {dayjs(post.sys.publishedAt).format('YYYY/MM/DD')}</Badge>
        </Box>
      </Box>

      <Box px={0} direction="column">
        <Box textStyle="h1" mb={8}>
          <LinkChakra href={`/${post.slug}`}>
            <h1>{post.title}</h1>
          </LinkChakra>
        </Box>
        {(post.platformsCollection && post.platformsCollection.items.length > 0) && (<Box>
          <PlatformList platforms={post.platformsCollection.items} />
        </Box>)}
        <Box display={{ base: "none", md: "flex" }} area-label="記事の概要" my={4} fontSize="1.4rem">
          {post.description}
        </Box>
        <Adsense slot={"1773582608"} />
        <Divider my={4} />
        <Box>
          <Flex w="full">
            <MarkdownRender source={post.body} />
          </Flex>
        </Box>
        <Adsense slot={"1529491287"} />
      </Box>
    </>
  )
}
