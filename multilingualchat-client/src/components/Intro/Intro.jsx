// import { Link } from 'react-router-dom'
// import  Services from './Services.jsx'
// function Intro() {
//   return (
//     <div className='flex justify-between pl-10'>
//         <div className='w-96 mt-16 flex flex-col'>
//             <h1 className='text-3xl text font-bold text-left'>Lorem ipsum dolor sit amet.</h1>
//             <p className='text-left'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, quisquam impedit! Perspiciatis sint minima voluptatibus?</p>
//            <Link to='/signup'> <button className='bg-black rounded-md text-white p-4 mt-6'>Get started</button></Link> 
//         </div>
       
//         <div><img  src='../file.png' /></div>
//         <Services/>
//     </div>
//   )
// }

// export default Intro


import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className='flex justify-around items-center pl-10'>
      <div className='w-96 mt-16 flex flex-col pb-10'>
        <h1 className='text-3xl font-bold text-left pb-2'>Live with Innon8!!</h1>
        <p className='text-left'>Get Started with Registration, Uploading of Medical Records. Book your First appointment with a Doctor Today.</p>
        <Link to='/signup'>
          <button className='bg-black rounded-md text-white p-4 mt-6'>Get started</button>
        </Link>
      </div>
      <div>
        <img src='/file.png' alt='Intro' />
      </div>
    </div>
  );
}

export default Intro;
