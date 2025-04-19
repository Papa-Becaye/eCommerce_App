import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TbShoppingBagHeart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { TbLocationHeart } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import Divider from './Divider';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { toast } from 'react-hot-toast';
import { logout } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const UserMenu = () => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            const res = await Axios({
                ...summaryApi.logout,
            })
            if(res.data.error) {
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            dispatch(logout());
            localStorage.clear();
            setTimeout(() => {
                navigate("/")
            }, 500)
        }catch (error) {
            AxiosToastError(error);
        }
    }
  return (
    <>
        <div className='flex items-center justify-between gap-2 p-2 lg:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/profile'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <CgProfile size={22} className='text-neutral-600'/>
                <div className='flex flex-col w-full'>
                    <p>My account</p>
                    <p className='text-sm text-gray-500'>{user?.name}</p>
                </div>
            </Link>
        </div>
        <Divider/>
        <div className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/orders'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <TbShoppingBagHeart size={22} className='text-neutral-600'/>
                Orders
            </Link>
        </div>
        <div className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <Link to={'/orders'} className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <TbLocationHeart size={22} className='text-neutral-600'/>
                Save address
            </Link>
        </div>
        <div onClick={handleLogout} className='flex items-center justify-between gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-200 ease-in-out'>
            <button className='text-neutral-600 font-semibold flex justify-center gap-2'>
                <TbLogout2 size={22} className='text-neutral-600'/>
                Logout
            </button>
        </div>
    </>
  )
}

export default UserMenu