import { Link } from 'react-router-dom'
import AuthBtn from '../AuthBtn/AuthBtn';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { dataSliceActions } from '../../store/data';
import { BACKENDURL } from '../../App';

function Header() {

  const { user , isSignedIn } = useUser();
  const userL = useSelector(state => state.data.user);
  const navigate = useNavigate();
  const  dispatch = useDispatch();

  const getUserData = async () => {
    const response = await fetch(`${BACKENDURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({ clerkId : user.id })
    });

    const data = await response.json();
    if(data.success){
      toast.info('User data fetched');
      dispatch(dataSliceActions.setUser(data.user));
      return;
    }
    return false;
  };

  useEffect(()=>{
    // if(isSignedIn && !userL){
    //   const data = getUserData();
    //   if(!data){
    //     toast.error('User data not fetched');
    //     toast.success('Signed in successfully');
    //     toast.info('Complete this form to proceed');
    //     navigate('/registration');
    //   }
    // }
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
        <Link to='/chk'> <li className='hover:underline cursor-pointer'>Check Disease</li></Link>
        <Link to='/preempt'><li className='hover:underline cursor-pointer'>Disease Predictor</li></Link>
        <Link to='/blockChain'><li className='hover:underline cursor-pointer'>Add Medical Rcords</li></Link>
        <Link to='/records' className='hover:underline cursor-pointer'>My Medical Records</Link>
        <Link to='/dashboard'><li>Dashboard</li></Link> 
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


