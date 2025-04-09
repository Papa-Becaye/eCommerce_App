import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='h-20 shadow-md sticky top-0'>
      <div className='container flex items-center mx-auto h-full px-2 justify-between'>
        {/* Logo */}
        <div className='h-full'>
          <Link to="/" className='h-full flex items-center justify-center'>
            <img src={logo} alt="Logo" width={170} height={60} className='logo hidden lg:block'/>
            <img src={logo} alt="Logo" width={120} height={60} className='logo lg:hidden'/>
          </Link>
        </div>
        {/* search */}
        <Search/>
        {/* Login and my card */}
        <div>
          <button className='h-10 px-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-primary hover:bg-primary hover:text-white'>Login</button>
          <button className='h-10 px-4 ml-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-primary hover:bg-primary hover:text-white'>My Card</button>
        </div>
      </div>
    </header>
  )
}

export default Header
