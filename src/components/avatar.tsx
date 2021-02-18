import { Author} from '@/lib/types'

interface Props {
  name: string;
  src: string;
}

export default function Avatar({name,src}:Props) {
  return (
    <div className="flex items-center">
      <img
        src={src}
        className="w-12 h-12 rounded-full mr-4 grayscale"
        alt={name}
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
