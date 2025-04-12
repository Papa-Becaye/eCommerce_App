import React, {useState} from 'react';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const validValue = Object.values(data).every((item) => item.length > 0);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(data.password !== data.confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        try {
            const res = await Axios({
                ...summaryApi.register,
                data: data,
            })
            if(res.data.error) {
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            setShowPassword(false);
            setShowConfirmPassword(false);
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }catch (error) {
            AxiosToastError(error);
        }
    }

  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white rounded-md p-7 my-4 max-w-lg mx-auto w-full grid gap-4'>
            <div className='md:text-2xl text-center text-gray-700'>
                <h1>Create your account</h1>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'> 
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id='name'
                        name ='name'
                        value={data.name}
                        placeholder='Enter your name'
                        autoFocus
                        className='bg-slate-50 border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition-all duration-200 ease-in-out'
                        onChange={handleChange}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        id='email'
                        name ='email'
                        value={data.email}
                        placeholder='Enter your email'
                        className='bg-slate-50 border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition-all duration-200 ease-in-out'
                        onChange={handleChange}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="password">Password</label>
                    <div className='flex items-center justify-between bg-slate-50 border border-gray-200 rounded-md gap-2 overflow-hidden group focus-within:border-primary transition-all duration-200 ease-in-out'>
                        <input type={!showPassword ? "password" : "text"}
                            id='password'
                            name ='password'
                            value={data.password}
                            placeholder='Enter your password'
                            className='gap-2 p-2 w-full outline-none'
                            onChange={handleChange}
                        />
                        <div className='cursor-pointer pr-2  group-focus-within:text-primary transition-all duration-200 ease-in-out' onClick={() => setShowPassword(prev => !prev)}>
                            {
                                showPassword ? (
                                    <IoIosEye size={22}/>
                                ) : (
                                    <IoIosEyeOff size={22}/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='flex items-center justify-between bg-slate-50 border border-gray-200 rounded-md gap-2 overflow-hidden group focus-within:border-primary transition-all duration-200 ease-in-out'>
                        <input type={!showConfirmPassword ? "password" : "text"}
                            id='confirmPassword'
                            name ='confirmPassword'
                            value={data.confirmPassword}
                            placeholder='Confirm your password'
                            className='gap-2 p-2 w-full outline-none'
                            onChange={handleChange}
                        />
                        <div className='cursor-pointer pr-2  group-focus-within:text-primary transition-all duration-200 ease-in-out' onClick={() => setShowConfirmPassword(prev => !prev)}>
                            {
                                showConfirmPassword ? (
                                    <IoIosEye size={22}/>
                                ) : (
                                    <IoIosEyeOff size={22}/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button type='submit' disabled={!validValue} className={`${validValue ? 'bg-green-800 hover:bg-green-700 transition-all duration-200 ease-in-out' : 'bg-green-300'} text-white font-semibold rounded-full p-2 my-4`}>Register</button>
            </form>
            <div className='text-center text-gray-600'>
                <p>Already have an account?
                    <span className='font-semibold px-2'>
                        <Link to={'/login'} className='text-green-800 cursor-pointer hover:text-green-700 transition-all duration-200 ease-in-out'>Login</Link>
                    </span>
                </p>
            </div>
        </div>
    </section>
  )
}

export default Register
