import React, { useEffect, useState } from 'react'
import Btn from '../Btn/Btn'
import UserData from '../UserData/UserData'

function Ddashboard() {
    // const API=''
    // const[users,setUsers]=useState([])
    // const fetchUsers=async(url)=>{
    //     try {
    //         const res=await fetch(url)
    //         const data=await res.n()
    //         if(data.length>0){
    //             setUsers(data)
    //         }
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }
    // useEffect(()=>{
    //     fetchUsers(API)
    // })
    const count=10
  return (
    <>
    <div>
        <div><button className='bg-white w-96 rounded-md m-12 p-10 text-2xl font-semibold shadow-xl'>
            Patient count:-{count}
        </button>
        <button className='bg-red-600 w-96 rounded-md font-bold m-12 p-10 text-2xl shadow-xl text-white'>
            Emergency
        </button></div>
        <h1 className='font-semibold text-2xl'>Appointments</h1>
        <div className='flex justify-center'>
             <table className="table-auto border-collapse border border-gray-200 w-full m-6 ">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Records</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Time</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Chat</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <UserData user={users} /> */}
                </tbody>
            </table>
        </div>

       
        
    </div>
    </>
  )
}

export default Ddashboard