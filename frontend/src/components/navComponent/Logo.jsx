import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
      
      {/* Spider Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full 
      bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xl 
      shadow-lg group-hover:rotate-12 group-hover:scale-110 transition duration-300">
        🕸️
      </div>

      {/* Text */}
      <h1 className="text-2xl font-extrabold tracking-wide">
        <span className="text-white">Edu</span>
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Spider
        </span>
      </h1>

    </Link>
  )
}

export default Logo