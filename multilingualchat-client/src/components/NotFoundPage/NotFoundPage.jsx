import React from 'react'
import { Link } from 'react-router-dom'
function NotFoundPage() {
  return (
    <div className=''>
      <div className='text-4xl font-bold h-[100px] flex justify-center  '>
        <h1 className='mt-auto mb-auto'>Muft ka chandan ghis mere nandan</h1>
      </div>  
       <Link to='/'><button className='mt-auto mb-auto border-4 bg-gray-400 p-4 rounded-2xl hover:bg-gray-500  hover:underline'> Wapas se mujhko le chal london</button> </Link>
  </div>
   
  )
}

export default NotFoundPage