import { Subject } from '@/models/Subject'
import Link from 'next/link'
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

  if (subject.content.icon && subject.content.icon) {
    iconStyle = subject.content.icon[0].style
    iconName = subject.content.icon[0].name
  } else {
    iconStyle = "fas" as IconPrefix
    iconName = "book" as IconName
  }

  return (
    <Link href={(`/subjects/${subject.slug}`)}>
      <a className="flex items-center text-xl p-3 font-bold shadow-lg rounded-lg text-white" style={{ background: `#${subject.content.bgColor}` }}>
        <div className="w-5 text-white mr-3"><FontAwesomeIcon icon={[iconStyle, iconName]} /></div><span>{subject.content.displayName}</span></a>
    </Link>)
}

const SubjectList = ({ subjects }: ListProps) => {
  return (
    <div className="flex flex-wrap">
      {subjects && subjects.map((s: Subject) => <OneSubject subject={s} key={s.slug} />)}
    </div>
  )
}

export default SubjectList