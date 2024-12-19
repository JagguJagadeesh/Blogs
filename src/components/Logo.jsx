import React from 'react'
import LogoImage from '../assets/blogs-logo.jpeg'

function Logo() {
  return (
    <div className='w-[140px]  '>
        <img src={LogoImage} className='object-fill rounded-ss-xl rounded-sm hover:scale-105 duration-75' alt="dcbbcjc" />
    </div>
  )
}

export default Logo 