import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';

function App() {
  
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
