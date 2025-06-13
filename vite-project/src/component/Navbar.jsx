import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-pink-800 h-13 items-center  text-white '>
        <div className="logo">
            <span className="font-bold text-2xl mx-9">Doit</span>
        </div>
        <ul className='flex gap-8 mx-10'>
            <li className='cursor-pointer hover:font-bold transition-all text-xl'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all text-xl'>Your Tasks</li>
        </ul>
    </nav>
   
  )
}

export default Navbar