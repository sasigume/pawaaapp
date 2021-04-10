import FaiconDiv from '@/components/common/faicon-div';
import LinkChakra from '@/components/common/link-chakra';
import { Person } from '@/models/contentful/Person';
import { Avatar, Button, Stack } from '@chakra-ui/react';

interface OneProps {
  person: Person;
}
interface ListProps {
  persons: Person[];
}

const OnePerson = ({ person }: OneProps) => {
  return (
    <Button
      cursor="default"
      _hover={{ transition: 'none' }}
      h="60px"
      leftIcon={
        <Avatar
          w={6}
          h={6}
          src={person.picture ? person.picture.url : process.env.HTTPS_URL + '/favicon.png'}
          name={person.displayName ? person.displayName : '(名前なし)'}
        />
      }
    >
      {person.displayName ? person.displayName : '(名前なし)'}
      {person.twitterId && (
        <Button
          ml={6}
          aria-label="フォロー"
          target="_blank"
          as={LinkChakra}
          href={`https://twitter.com/${person.twitterId}`}
          colorScheme="twitter"
          leftIcon={<FaiconDiv icon={['fab', 'twitter']} />}
        >
          フォロー
        </Button>
      )}
    </Button>
  );
};

const PersonList = ({ persons }: ListProps) => {
  return (
    <Stack mb={4} spacing={2}>
      {persons && persons.map((c: Person) => <OnePerson person={c} key={c.slug} />)}
    </Stack>
  );
};

export default PersonList;
