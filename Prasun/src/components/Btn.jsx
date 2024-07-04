import React from 'react'

function Btn(props) {
  return (
    <div className=' w-96 rounded-md m-12 p-10 text-2xl shadow-xl hover:shadow-2xl cursor-pointer'>{props.label}</div>
  )
}

export default Btn