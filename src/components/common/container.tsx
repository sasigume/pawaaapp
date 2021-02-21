import { ReactNode } from 'react'
interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="whitespace-normal max-w-4xl mx-auto px-5"> {children}</div>
}