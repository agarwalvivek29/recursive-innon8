import React from 'react'

function Btn(props) {
  return (
    <div className=' w-72 rounded-md m-6 p-6 text-2xl shadow-xl hover:shadow-2xl cursor-pointer'>{props.label}</div>
  )
}

export default Btn