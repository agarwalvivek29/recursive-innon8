import React from 'react'

function Step(props) {
  return (
    <div className='border-2 w-52 rounded-md mt-12'><h1> Step {props.number}</h1>
    <p>{props.description}</p>
    </div>
  )
}

export default Step