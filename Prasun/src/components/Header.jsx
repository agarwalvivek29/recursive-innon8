import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
  
    <header className='flex m-0  justify-between max-w-full'>
    <div className='m-0'>
    <img
                        src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                        className="mr-3 h-12"
                        alt="Logo"
                    />          
    </div>
    <div>
        <ul className='flex gap-10'> 
        <Link to='/'><li className='hover:underline cursor-pointer'>Home</li></Link>
        
        <a href='#serv'><li className='hover:underline cursor-pointer'>Service</li></a>
        <li className='hover:underline cursor-pointer'>Contact</li>
       <Link to='/Pdashboard'><li>p-dashboard</li></Link> 
       <Link to='/Ddashboard'><li>D-dashboard</li></Link> 
        </ul>
    </div>
    <div>
      <ul className='flex gap-4 pr-2'>
       <Link to='/login' ><li className='hover:underline'>login</li></Link> 
       <Link to='/signup' ><li className='hover:underline'>Register</li></Link>
      </ul>
    </div>
</header>
  );
}

export default Header


