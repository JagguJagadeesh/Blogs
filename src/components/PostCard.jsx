import React from 'react'
import dataservice from '../appwrite/DatabaseService'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage,contant}) {
  const imagedata = dataservice.getFilePreview(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full text-black bg-gray-200 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imagedata} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            <p>{contant}</p>
        </div>
    </Link>
  )
}

export default PostCard