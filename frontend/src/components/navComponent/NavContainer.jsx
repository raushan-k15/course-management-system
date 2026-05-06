import React from 'react'
import NavBar from './NavBar'
import Logo from './Logo'

const NavContainer = () => {
  return (
    <div className="
      flex items-center justify-between
      px-6 md:px-12 py-4
      
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      
      shadow-xl rounded-b-3xl
      
      sticky top-0 z-50
      
      backdrop-blur-md
      
      transition-all duration-300
      hover:shadow-2xl
    ">
      
      <Logo />

      <div className="flex items-center gap-4">
        <NavBar />
      </div>

    </div>
  )
}
export default NavContainer