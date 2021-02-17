import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Container = ({ children }: Props) => (
  <div className="mx-4 flex flex-col justify-center items-center">
    {children}
  </div>
)

export default Container
