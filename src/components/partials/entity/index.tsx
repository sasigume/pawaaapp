import { SingleEntityComponent } from './single-entity';
import { Entity } from '@/models/nest/Entity';
import { Center, SimpleGrid } from '@chakra-ui/react';

interface MultiEntityProps {
  entities: Entity[];
  mode?: string;
}
const Multientities = ({ entities }: MultiEntityProps) => {
  return (
    <section>
      <Center flexDirection="column">
        <SimpleGrid maxW="96vw" spacing={4} minChildWidth="300px" columns={{ base: 2, lg: 3 }}>
          {entities.map((entity: Entity) => (
            <SingleEntityComponent key={entity.bedrockId} entity={entity} />
          ))}
        </SimpleGrid>
      </Center>
    </section>
  );
};

interface EntityListProps {
  entities: Entity[];
  mode?: string;
  expand?: boolean;
}

export const EntityList = ({ entities, mode }: EntityListProps) => {
  if (mode == 'single') {
    return <SingleEntityComponent entity={entities[0]} />;
  } else {
    return <Multientities mode={mode} entities={entities} />;
  }
};

export default EntityList;
