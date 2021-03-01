import LinkChakra from '@/components/common/link-chakra'
import { Creator } from '@/models/contentful/Creator'
import { Avatar, Button, Flex, Stack } from '@chakra-ui/react'

interface OneProps {
  creator: Creator
}
interface ListProps {
  creators: Creator[]
}

const OneCreator = ({ creator }: OneProps) => {

  return (
    <Button href={`/creators/${creator.slug}`} as={LinkChakra} leftIcon={
      <Avatar
      w={6}
      h={6}
        src={creator.picture ? creator.picture.url : (process.env.HTTPS_URL + '/favicon.png')}
        name={creator.displayName ? creator.displayName : '(名前なし)'}
      />
    }>
      {creator.displayName ? creator.displayName : '(名前なし)'}
    </Button>
  )
}

const CreatorList = ({ creators }: ListProps) => {
  return (
    <Stack mb={4} spacing={2}>
      {creators && creators.map((c: Creator) => <OneCreator creator={c} key={c.slug} />)}
    </Stack>
  )
}

export default CreatorList
