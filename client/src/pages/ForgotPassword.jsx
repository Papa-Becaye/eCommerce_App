import React, {useState} from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import forgotPasswordImg from '../assets/forgot_password_ia.svg';


const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
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

        try {
            const res = await Axios({
                ...summaryApi.forgotPassword,
                data: data,
            })
            if(res.data.error) {
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/verify-otp', {
                    state: data
                })
            }, 2000)
            setData({
                email: "",
            })
        }catch (error) {
            AxiosToastError(error);
        }
    }

  return (
    <section className='w-full mx-auto px-2 backdrop-blur-custom'>
        <div className='bg-white rounded-md p-7 my-4 max-w-lg mx-auto w-full grid gap-4 border border-gray-200'>
            <div className='hidden lg:flex h-50 items-center justify-center p-3'>
                <img src={forgotPasswordImg} alt="forgot_password_img" className='h-full' />
            </div>
            <div className='md:text-2xl text-center text-gray-700'>
                <h1>Verify your identity</h1>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor="email" className='required'>Email</label>
                    <input type="email"
                        id='email'
                        name ='email'
                        value={data.email}
                        placeholder='Enter your email'
                        className='bg-slate-50 border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition-all duration-200 ease-in-out'
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' disabled={!validValue} className={`${validValue ? 'bg-green-800 hover:bg-green-700 transition-all duration-200 ease-in-out' : 'bg-green-300'} text-white font-semibold rounded-full p-2 my-4`}>Next</button>
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

export default ForgotPassword