import React, {useState} from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";


const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    console.log(data)

  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white rounded-md p-4 my-4 max-w-lg mx-auto w-full grid gap-4'>
            <h1>Welcom to Binkeyit</h1>
            <form action="" className='grid gap-4'>
                <div className='grid gap-1'>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id='name'
                        name ='name'
                        value={data.name}
                        placeholder='Enter your name'
                        autoFocus
                        className='bg-slate-50 border border-gray-200 rounded-md p-2'
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
                        className='bg-slate-50 border border-gray-200 rounded-md p-2'
                        onChange={handleChange}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor="password">Password</label>
                    <div className='flex items-center justify-between bg-slate-50 border border-gray-200 rounded-md gap-2 focus-within:border-primary transition-all duration-200 ease-in-out'>
                        <input type={showPassword ? "password" : "text"}
                            id='password'
                            name ='password'
                            value={data.password}
                            placeholder='Enter your password'
                            className='gap-2 p-2 w-full outline-none'
                            onChange={handleChange}
                        />
                        <div className='cursor-pointer pr-2' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? (
                                    <IoIosEyeOff size={25}/>
                                ) : (
                                    <IoIosEye size={25}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Register
