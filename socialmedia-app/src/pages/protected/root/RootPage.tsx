import React from 'react'
import ContentPosts from './components/ContentPosts'
import AddPost from './components/AddPost'

export default function RootPage() {
  return (
    <div className='space-y-3'>
        <h1 className='text-md font-bold'>Publicaciones</h1>
        <AddPost />
        <ContentPosts />
    </div>
  )
}
