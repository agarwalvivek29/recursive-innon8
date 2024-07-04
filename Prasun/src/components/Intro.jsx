import React from 'react'
import { Link } from 'react-router-dom'

function Intro() {
  return (
    <div className='flex justify-between pl-10'>
        <div className='w-96 mt-16 flex flex-col'>
            <h1 className='text-3xl text font-bold text-left'>Lorem ipsum dolor sit amet.</h1>
            <p className='text-left'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, quisquam impedit! Perspiciatis sint minima voluptatibus?</p>
           <Link to='/signup'> <button className='bg-black rounded-md text-white p-4 mt-6'>Get started</button></Link> 
        </div>
       
        <div><img  src='../public/file.png' /></div>
    </div>
  )
}

export default Intro