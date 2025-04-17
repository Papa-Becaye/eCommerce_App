import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const fetchUserDetailsData = async() => {
    const userDetails = await fetchUserDetails();
    if(userDetails) {
      dispatch(setUserDetails(userDetails));
    }
  }
  
  useEffect(() => {
    fetchUserDetailsData();
  }
  , [])
  return (
  <>
  <div className='font-montserrat font-medium'>
    <Header/>
    <main className='flex justify-center min-h-[82vh]'>
      <Outlet />
    </main>
    <Footer/>
    <Toaster/>
  </div>
  </>
  )
}

export default App
