import { Link } from 'react-router-dom'
import AuthBtn from '../AuthBtn/AuthBtn';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';

function Header() {

  const { isSignedIn } = useUser();
  const user = useSelector(state => state.data.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(isSignedIn && !user){
      toast.success('Signed in successfully');
      toast.info('Complete this form to proceed');
      navigate('/registration');
    }
  },[isSignedIn])


  return (
  
    <header className='flex m-0 p-2 items-center justify-between max-w-full'>
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
        <AuthBtn />
      </ul>
    </div>
</header>
  );
}

export default Header


