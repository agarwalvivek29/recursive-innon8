import React from 'react'
import { Link } from 'react-router-dom'
function Service(props) {
  return (
    <div className=' w-72 h-80 m-2 bg-white p-5'>

      <img src={props.img} alt="" className='h-16 mx-auto'/>
        <h3 className='font-bold'>{props.label}</h3>
        <p>{props.description}</p>
        <Link to={`/service/${props.url}`}> <h6 className='underline'>Learn more</h6> </Link>
    </div>
  )
}

export default Service