import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  
  return (
  <>
  <div className='font-montserrat font-medium'>
    <Header/>
    <main className='flex justify-center min-h-[78vh]'>
      <Outlet />
    </main>
    <Footer/>
  </div>
  </>
  )
}

export default App
