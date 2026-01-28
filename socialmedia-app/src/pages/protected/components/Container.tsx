import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  return (
    <div className={"w-full max-w-xl mx-auto space-y-4"}>
      {children}
    </div>
  )
}
