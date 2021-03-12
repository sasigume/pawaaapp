import LinkChakra from '@/components/common/link-chakra'
import { Person } from '@/models/contentful/Person'
import { Avatar, Button, Flex, Stack, Tooltip } from '@chakra-ui/react'

interface OneProps {
  person: Person
}
interface ListProps {
  persons: Person[]
}

const OnePerson = ({ person }: OneProps) => {

  return (
    <Tooltip label="二重コンテンツになるから著者記事一覧はないよ！">
      <Button cursor="default" leftIcon={
        <Avatar
          w={6}
          h={6}
          src={person.picture ? person.picture.url : (process.env.HTTPS_URL + '/favicon.png')}
          name={person.displayName ? person.displayName : '(名前なし)'}
        />
      }>
        {person.displayName ? person.displayName : '(名前なし)'}
      </Button>
    </Tooltip>
  )
}

const PersonList = ({ persons }: ListProps) => {
  return (
    <Stack mb={4} spacing={2}>
      {persons && persons.map((c: Person) => <OnePerson person={c} key={c.slug} />)}
    </Stack>
  )
}

export default PersonList
