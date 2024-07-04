import React from 'react'

function Btn(props) {
  return (
    <div className='bg-red-400 w-96 rounded-md m-12 p-10 text-2xl shadow-xl'>{props.label}</div>
  )
}

export default Btn