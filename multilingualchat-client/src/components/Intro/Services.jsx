import React from 'react'
import Service from './Service'
import { Link } from 'react-router-dom'
function Services() {
  return (
    <div className='p-10 bg-gray-100' id='serv'>
     
    <div className='flex justify-between flex-wrap'>
      <div className='flex flex-1 w-52 h-80 m-2 bg-white p-5 flex-col align-middle'> <h1 className='text-center font-bold text-3xl m-auto'>Our Services</h1></div>

     <Service img='../../speech-bubble.png' url='Chat'label='Multilingual Chat'description='Communicate with doctors in your preferred language. Our real-time translation service ensures that you can understand and be understood, regardless of language barriers.'/>

     <Service img='../../artificial-intelligence.png' url='Predictions' label='AI Health Predictions' description='Our advanced AI models analyze your medical history to predict potential health issues and provide insights to help you stay ahead of possible diseases.'/>

    <Service img='../../blockchain.png'  url='Blockchain' label='Blockchain Security' description='Your medical records and prescriptions are stored securely on the blockchain, ensuring they cannot be tampered with and are always accessible to authorized parties.'/>

     <Service img='../../qr-code.png' url='Verification' label='Medicine Verification' description='Verify the authenticity of your medications by scanning QR codes. Our system checks the blockchain to ensure your medicine is genuine'/>

     <Service img='../../medical-prescription.png' url='Queries' label='Post-Medication Queries' description='Have questions after your treatment? Submit your queries and get answers from our AI-powered system, helping you understand your post-medication care.'/>
     
    </div>

    </div>
  )
}

export default Services
