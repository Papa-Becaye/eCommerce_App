import React from 'react'
import UserMenu from '../components/UserMenu'
import { CgClose } from "react-icons/cg";

const UserMenuMobile = () => {
  return (
    <section className='w-full mx-auto px-2'>
        <div className='bg-white/30 backdrop-blur-2xl rounded-md p-3 w-full h-full  border border-gray-200'>
            <button className='absolute top-0 right-0 z-10 p-3' onClick={() => window.history.back()}>
                <CgClose size={22} className='text-neutral-800'/>
            </button>
            <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile
