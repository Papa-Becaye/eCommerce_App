import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TbShoppingBagHeart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";

const UserMenu = () => {
    const user = useSelector((state) => state?.user);
  return (
    <div className='absolute top-12 right-0 bg-white shadow-md rounded-md p-2 min-w-40 border border-gray-200 z-10'>
        <div className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/profile'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <CgProfile size={22} className='text-neutral-600'/>
                Profile
            </Link>
        </div>
        <div className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/orders'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <TbShoppingBagHeart size={22} className='text-neutral-600'/>
                Orders
            </Link>
        </div>
        <div className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/logout'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <TbLogout2 size={22} className='text-neutral-600'/>
                Logout
            </Link>
        </div>
    </div>
  )
}

export default UserMenu