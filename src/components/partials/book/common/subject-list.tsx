import { Subject } from '@/models/contentful/Subject'
import LinkChakra from '@/components/common/link-chakra'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { Button, Stack } from '@chakra-ui/react'
import FaiconDiv from '@/components/common/faicon-div'

interface Props {
  subject: Subject
}

interface ListProps {
  subjects: Subject[]
}

const OneSubject = ({ subject }: Props) => {

  let iconStyle, iconName

  if (subject.icon) {
    iconStyle = subject.icon.style
    iconName = subject.icon.name
  } else {
    iconStyle = "fas" as IconPrefix
    iconName = "book" as IconName
  }

  return (
    <Button href={(`/subjects/${subject.slug}`)} colorScheme={subject.bgColor ?? "green"} as={LinkChakra} leftIcon={<FaiconDiv icon={[iconStyle, iconName]} />}>
      {subject.displayName}
    </Button>
  )
}

const SubjectList = ({ subjects }: ListProps) => {
  return (
    <Stack mb={4}>
      {subjects.map((s: Subject) => <OneSubject subject={s} key={s.slug} />)}
    </Stack>
  )
}

export default SubjectList