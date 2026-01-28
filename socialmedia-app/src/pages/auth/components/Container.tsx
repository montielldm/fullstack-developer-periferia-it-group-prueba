import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function Container({ children }: Props) {
  return (
    <div className='flex items-start pt-20 justify-center h-175 p-3'>
      {children}
    </div>
  )
}
