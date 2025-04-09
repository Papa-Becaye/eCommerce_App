import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);

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
        <div className='flex items-center min-w-[300px] h-12 lg:min-w-[420px] rounded-lg border border-gray-200 p-1 overflow-hidden text-neutral-500 bg-slate-50 group focus-within:border-primary transition-all duration-200 ease-in-out'>
            <button className='flex items-center justify-center h-full p-3 group-focus-within:text-primary transition-all duration-200 ease-in-out'>
                <IoSearch size={22}/>
            </button>
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
