import React, {useState, useRef} from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""]);
    const validValue = data.every((item) => item.length > 0);
    const navigate = useNavigate();
    const refInput = useRef([]);
    const location = useLocation();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await Axios({
                ...summaryApi.verifyOtp,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                },
            })
            if(res.data.error) {
                toast.error(res.data.message)
                return;
            }
            toast.success(res.data.message)
            setData(["","","","","",""]);
            setTimeout(() => {
                navigate('/reset-password', {
                    state: {
                        email: location?.state?.email,
                        data: res.data
                    }
                })
            }, 2000)
        }catch (error) {
            AxiosToastError(error);
        }
    }

  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white rounded-md p-7 my-4 max-w-lg mx-auto w-full grid gap-4 border border-gray-200'>
            <div className='md:text-2xl text-center text-gray-700'>
                <h1>Verify your email</h1>
            </div>
            <form className='grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1 mx-auto'>
                    <label className='flex justify-center items-center' htmlFor="otp">Enter the OTP</label>
                    <div className='flex justify-between md:w-80 items-center'>
                        {
                            data.map((item, index) => (
                                <input key={index}
                                type="text"
                                maxLength={1}
                                ref={el => refInput.current[index] = el}
                                value={item} 
                                onChange={(e) => {
                                    const newData = [...data];
                                    newData[index] = e.target.value;
                                    setData(newData);
                                    if (e.target.value.length === 1 && index < data.length - 1) {
                                        refInput.current[index + 1].focus();
                                    } else if (e.target.value.length === 0 && index > 0) {
                                        refInput.current[index - 1].focus();
                                    }
                                }} id={`otp-${index}`} className='w-full max-w-sm h-12 border border-gray-200 rounded-md p-2 outline-none focus:border-primary transition-all duration-200 ease-in-out mx-1 text-center' />
                            ))
                        }
                    </div>
                </div>
                <button type='submit' disabled={!validValue} className={`${validValue ? 'bg-green-800 hover:bg-green-700 transition-all duration-200 ease-in-out' : 'bg-green-300'} text-white font-semibold rounded-full p-2 my-4`}>Verify OTP</button>
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

export default OtpVerification