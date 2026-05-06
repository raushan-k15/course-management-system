import React from 'react'
import NavContainer from '../components/navComponent/NavContainer'
import Footer from '../components/footerComponent/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='h-screen flex - flex-col'>
        <div className='h-[80px] w-screen'>
             <NavContainer/>
        </div>
        <div className="h-full">
         <Outlet />
         </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Layout
