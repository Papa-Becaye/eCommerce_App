import React, {useState} from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import UserMenu from './UserMenu';

function Header() {

  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const isHidden = ((location.pathname === '/login'
    || location.pathname === '/register'
    || location.pathname === '/forgot-password'
    || location.pathname === '/reset-password'
    || location.pathname === '/verify-email'
  ) && !isMobile);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
  const handleClickMenuUser = () => {
    setIsOpenMenuUser(!isOpenMenuUser);
  };

  const handleMenuUserMobile = () => {
    if (isMobile && user?._id) {
      navigate("/user-menu-mobile")
      return;
    }
    navigate("/login")
  }

  const redirectToLogin = () => {
    navigate("/login")
  };

  return (
    <header className={`${(isHidden) ? 'hidden' : 'flex'} h-28 lg:h-20 md:shadow-md sticky backdrop-blur top-0 justify-center flex-col gap-1 bg-white/30 z-10`}>
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
                <button onClick={handleMenuUserMobile} className='lg:hidden flex items-center justify-center text-neutral-600'>
                  <FaRegUserCircle size={25}/>
                </button>
              </div>
              <div className='hidden lg:flex justify-center items-center gap-4'>
              {
                user?._id ? (
                  <div className='relative'>
                    <div onClick={handleClickMenuUser} className='flex items-center justify-center gap-2 text-neutral-600 p-3 cursor-pointer font-semibold hover:text-gray-900 transition-all duration-200 ease-in-out'>
                      <p>Account</p>
                      <span>
                        {isOpenMenuUser ? <MdArrowDropUp size={25} className='text-neutral-600'/> : <MdArrowDropDown size={25} className='text-neutral-600'/>}
                      </span>
                    </div>
                    <div className={`${isOpenMenuUser ? 'block' : 'hidden'}`}>
                      <div className='absolute top-12 right-0 bg-white/30 backdrop-blur-2xl shadow-md rounded-md p-2 min-w-50 border border-gray-200 z-10'>
                        <UserMenu/>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={redirectToLogin} className='text-neutral-600 border border-gray-200 rounded-md p-3 cursor-pointer font-semibold hover:text-gray-900 transition-all duration-200 ease-in-out'>Log in</button>
                )}
                <div>
                  <button className='flex items-center justify-center text-white gap-1 bg-green-800 rounded-sm p-3 hover:bg-green-700 transition-all duration-300 ease-in-out'>
                    <div className='animate-bounce'>
                      <TiShoppingCart size={26}/>
                    </div>
                    <div className='text-semibold'>
                      <p>My card</p>
                    </div>
                  </button>
                </div>
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
