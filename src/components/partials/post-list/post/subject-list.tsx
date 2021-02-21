import {Subject} from '@/models/Subject'

interface Props {
  subject: Subject
}

interface ListProps {
  subjects: Subject[]
}

const OneSubject = ({subject}:Props) => (
  <a href={(`/subjects/${subject.slug}`)} className="block p-2 shadow-lg rounded-lg">{subject.content.displayName}</a>
)

const SubjectList = ({subjects}:ListProps) => {
  return (
    <div className="flex flex-wrap">
      {subjects && subjects.map((s: Subject) => <OneSubject subject={s} key={s.slug} />)}
    </div>
  )
}

export default SubjectList