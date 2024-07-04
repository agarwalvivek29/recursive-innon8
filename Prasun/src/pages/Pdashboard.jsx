import React from 'react'
import Header from '../components/Header'
import Btn from '../components/Btn'

function Pdashboard() {
  return (
    <>
    <Header />
    <div className='flex flex-wrap'>
      <div><Btn label='Blood Group'/></div>
      <div><Btn label='find doctors'/></div>
      <div><Btn label='disease'/></div>
      <div><Btn label='add a prescription'/></div>
    </div>
    <h1>My medical history</h1>
    <div className='flex justify-center'>
             <table class="table-auto border-collapse border border-gray-200 w-full m-6 ">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">lorem</th>
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