import { parseISO, format } from 'date-fns'
import { useEffect, useState } from 'react'
interface Props { dateString: string; }
// dateString might be null for unpublished posts
export default function DateComponent({ dateString }:Props) {
  const [date, setDate] = useState(dateString ? parseISO(dateString) : null)
  useEffect(() => {
    if (!date) {
      setDate(new Date())
    }
  }, [date])
  return date && <time dateTime={date.toString()}>{format(date, 'LLLL d, yyyy')}</time>
}
