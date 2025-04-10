import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='flex border-t pt-3 justify-center h-20'>
      <div className='container gap-3 mx-auto text-center lg:flex-row lg:justify-between lg:px-2 flex flex-col w-full h-full'>
        <p className='flex justify-center items-center'>© 2025 Binkeyit. All rights reserved.</p>
        <div className='flex text-2xl justify-center items-center ml-4'>
          <a href='#'>
            <FaFacebook className='ml-4 hover:text-primary' />
          </a>
          <a href='#'>
            <FaInstagram className='ml-4 hover:text-primary' />
          </a>
          <a href='#'>
            <FaLinkedin className='ml-4 hover:text-primary' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
