import FaiconDiv from '@/components/common/faicon-div';
import LinkChakra from '@/components/common/link-chakra';
import { Person } from '@/models/contentful/Person';
import { Avatar, Box, Button, Center, Stack, useColorMode } from '@chakra-ui/react';

interface OneProps {
  person: Person;
}
interface ListProps {
  persons: Person[];
}

const OnePerson = ({ person }: OneProps) => {
  const { colorMode } = useColorMode();
  return (
    <Center pl={4} pr={3} rounded="lg" h="60px" bg={colorMode == 'light' ? 'gray.100' : 'gray.900'}>
      <Avatar
        w={6}
        h={6}
        src={person.picture ? person.picture.url : process.env.HTTPS_URL + '/favicon.png'}
        name={person.displayName ? person.displayName : '(名前なし)'}
        mr={3}
      />
      <LinkChakra href={`/persons/${person.slug}`} zIndex={5}>
        {person.displayName ? person.displayName : '(名前なし)'}
      </LinkChakra>
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
    </Center>
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
