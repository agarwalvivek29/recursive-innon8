import React from 'react'
import Btn from '../Btn/Btn'

function Pdashboard() {
  return (
    <>
    <div className='flex justify-between'>
      <div className='bg-slate-300 w-36 rounded-md shadow-lg'>
        <h2>blood group</h2>
         <p className='bg-slate-200'>O+</p>
        </div>
      <div className='bg-slate-300 w-36 rounded-md shadow-lg'>
        <h2>Age</h2>
        <p  className='bg-slate-200'>23</p>
        </div>
      <div className='bg-slate-300 w-36 rounded-md shadow-lg'>
        <h2>Gender</h2>
        <p  className='bg-slate-200'>M</p>
        </div>
      <div className='bg-slate-300 w-36 rounded-md shadow-lg'>
        <h2>height</h2>
        <p  className='bg-slate-200'>179 cm</p>
        </div>
      <div className='bg-slate-300 w-36 rounded-md shadow-lg'>
        <h2>weight</h2>
        <p  className='bg-slate-200'>70 kg</p>
        </div>

    </div>
    <div className='flex flex-wrap'>
      
      <div><Btn label='find doctors'/></div>
      <div><Btn label='disease'/></div>
      <div><Btn label='add a prescription'/></div>
    </div>
    <h1>My medical history</h1>
    <div className='flex justify-center'>
             <table className="table-auto border-collapse border border-gray-200 w-full m-6 ">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <UserData user={users} /> */}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Pdashboard