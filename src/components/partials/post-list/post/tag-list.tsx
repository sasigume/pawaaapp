interface TagProps {
  tag?: string;
}

interface TagsProps {
  tags?: string[];
}

const Tag = ({tag}: TagProps) => (
  <a href={(`/tags/${tag}`)} className="block p-2 shadow-lg rounded-lg">{tag}</a>
)

const TagList = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap">
      {tags && tags.map((t: string) => <Tag tag={t} key={t} />)}
    </div>
  )
}

export default TagList