import { Subject } from '@/models/contentful/Subject'
import LinkChakra from '@/components/common/link-chakra'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'

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
    <LinkChakra href={(`/subjects/${subject.slug}`)}>
      <div className="flex items-center text-xl p-3 font-bold shadow-lg rounded-lg text-white" style={{ background: `#${subject.bgColor}` }}>
        <div className="w-5 text-white mr-3"><FontAwesomeIcon icon={[iconStyle, iconName]} /></div><span>{subject.displayName}</span>
        </div>
    </LinkChakra>)
}

const SubjectList = ({ subjects }: ListProps) => {
  return (
    <div className="flex flex-wrap">
      {subjects.map((s: Subject) => <OneSubject subject={s} key={s.slug} />)}
    </div>
  )
}

export default SubjectList