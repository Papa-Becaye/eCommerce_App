import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();


    useEffect(() => {
        const isSearch = location.pathname === '/search';
        setIsSearchPage(isSearch);
    }, [location]);

    // console.log(isSearchPage);
    const handleSearch = () => {
        navigate("/search")
    };
  return (
    <div>
        <div className='flex items-center min-w-[300px] h-11 lg:h-12 lg:min-w-[420px] rounded-lg dark:border-gray-200/30 border border-gray-200 p-1 overflow-hidden text-neutral-500 dark:bg-slate-800 dark:text-gray-400 bg-slate-50 group focus-within:border-primary transition-all duration-200 ease-in-out'>
            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to='/' className='flex items-center justify-center h-full p-2 m-1 bg-white rounded-full shadow-2xs group-focus-within:text-primary transition-all duration-200 ease-in-out'>
                            <IoChevronBack size={20}/>
                        </Link>
                    ) : (
                        <button className='flex items-center justify-center h-full p-3 group-focus-within:text-primary transition-all duration-200 ease-in-out'>
                            <IoSearch size={22}/>
                        </button>
                    )
                }
            </div>
            {
                !isSearchPage ? (
                    <div onClick={handleSearch}>
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "panner"',
                                1000,
                                'Search "pasta"',
                                1000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <input type="text" className='w-full h-full outline-none bg-transparent' autoFocus placeholder='Search for products, brands and more'/>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Search
