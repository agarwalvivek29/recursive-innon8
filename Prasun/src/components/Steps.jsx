import React from 'react'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Step from './Step.jsx'
function Steps() {
  const { id } = useParams();
  return (
    <>
   <Header />
   <h1 className='text-3xl font-bold'>{id}</h1>
    <div className='flex m-8 gap-4 flex-wrap justify-between p-10  my-auto'>
        <Step number='1' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
        <p className='my-auto'>➡️</p>
        <Step number='2' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
        <p className='my-auto'>➡️</p>
        <Step number='3' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
        <p className='my-auto'>➡️</p>
        <Step number='4' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
        <p className='my-auto'>➡️</p>
        <Step number='5' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
        <p className='my-auto'>➡️</p>
        <Step number='6' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, doloremque.'/>
    </div>
    </>
  )
  
}

export default Steps