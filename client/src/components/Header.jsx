import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile'
import { useLocation } from 'react-router-dom'

function Header() {

  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  return (
    <header className='h-28 lg:h-20 md:shadow-md sticky top-0 bg-red-500 flex justify-center flex-col gap-1'>
      {
        !(isMobile && isSearchPage) && (
          <div className='container flex items-center mx-auto px-2 justify-between'>
            {/* Logo */}
            <div className='h-full'>
              <Link to="/" className='h-full flex items-center justify-center'>
                <img src={logo} alt="Logo" width={170} height={60} className='logo hidden lg:block'/>
                <img src={logo} alt="Logo" width={120} height={60} className='logo lg:hidden'/>
              </Link>
            </div>
            {/* search */}
            <div className='hidden lg:block'>
              <Search/>
            </div>
            {/* Login and my card */}
            <div>
              <div>
                <button className='lg:hidden flex items-center justify-center text-neutral-600'>
                  <FaRegUserCircle size={25}/>
                </button>
              </div>
              <div className='hidden lg:block'>
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        )
      }
      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>
    </header>
  )
}

export default Header
