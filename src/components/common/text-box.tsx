import { ReactNode } from 'react'
interface Props {
  bgColor?: string
  borderColor?: string
  children: ReactNode
}

export default function TextBox({ borderColor = 'green-400',bgColor = 'white', children }: Props) {
  return <div className={(`p-4 whitespace-normal text-left border-2 rounded-xl shadow-xl border-${borderColor} bg-${bgColor}`)}> {children}</div>
}