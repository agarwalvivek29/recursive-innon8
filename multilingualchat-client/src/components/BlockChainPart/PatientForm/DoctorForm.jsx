// import React, { useState } from 'react';

// const DoctorForm = () => {
//   const [patientId, setPatientId] = useState('');
//   const [patientData, setPatientData] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setPatientId(e.target.value);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(''); // Clear any previous messages
  
//     try {
//       const response = await fetch(`http://localhost:5000/api/patient/${patientId}`, {
//         method: 'GET'
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       console.log('Received data:', data); // Add this line to log the received data
  
//       if (data.error) {
//         setMessage(data.error); // Display server-side error message
//         setPatientData(null);
//       } else if (data.length === 0) {
//         setMessage('No data to show for this patient ID');
//         setPatientData(null);
//       } else {
//         setPatientData(data);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Error fetching data. Please try again.');
//       setPatientData(null);
//     }
//   };
  

//   return (
//   <div>
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={patientId} onChange={handleChange} placeholder="Patient ID" />
//       <button type="submit">Get Patient Data</button>
//     </form>
//     {message && <p>{message}</p>}
//     {patientData && (
//       <div>
//         <h2>Patient Data</h2>
//         {patientData.map((data, index) => (
//           <div key={index}>
//             <p>Name: {data.patientName}</p>
//             <p>Age: {data.patientAge}</p>
//             <p>Address: {data.patientAddress}</p>
//             <p>Contact: {data.patientContact}</p>
//             <p>Email: {data.patientEmail}</p>
//             <p>Medical History: {data.medicalHistory}</p>
//             {data.medicalImages && (
//               <div>
//                 <h3>Medical Images:</h3>
//                 <img src={`data:image/jpeg;base64,${data.medicalImages}`} alt="Medical" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// export default DoctorForm;


import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';

const DoctorForm = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPatientId(e.target.value);
  };

  const { user, isSignedIn } = useUser();
  let count;
  async function counter(){
    const interval = setInterval(()=>{
      if(count === 0){
        clearInterval(interval);
        return;
      }
      count--;
    },1000);
  }

  useEffect(()=>{
    if(!patientData){
      counter();
      const userId = user ? user.id : '';
      setPatientId(userId);
      fetchData();
      console.log(userId);
    }
  },[count]);

  const fetchData = async () => {
    setMessage(''); // Clear any previous messages

    try {
      const response = await fetch(`https://recursive-innon8-1.onrender.com/api/patient/${patientId ? patientId : user.id}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Received data:', data); // Ensure data is received properly

      if (data.error) {
        setMessage(data.error); // Display server-side error message
        setPatientData(null);
      } else if (data.length === 0) {
        setMessage('No data to show for this patient ID');
        setPatientData(null);
      } else {
        setPatientData(data); // Update patientData state with received data array
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error fetching data. Please try again.');
      setPatientData(null);
    }
  };

  return (
    <div>
      {!patientData && <div className='p-30 py-50 flex justify-center text-5xl'>Loading.....</div>
        // <form onSubmit={handleSubmit}>
        //   <input type="text" value={patientId} onChange={handleChange} placeholder="Patient ID" />
        //   <button type="submit">Get Patient Data</button>
        // </form>
      }
      {message && <p>{message}</p>}
      {patientData && (
        <div>
          <h2>Patient Data</h2>
          {patientData.map((data, index) => (
            <div key={index}>
              <p>Name: {data.patientName}</p>
              {data.Age !== '' && <p>Age: {data.patientAge}</p>}
              {data.patientAddress !== '' && <p>Date & Time: {data.patientAddress}</p>}
              {data.patientAddress !== "" && <p>Contact: {data.patientContact}</p>}
              {data.patientEmail !== "" && <p>Email: {data.patientEmail}</p>}
              <p>Medical History: {data.medicalHistory}</p>
              {data.medicalImages && (
                <div>
                  <h3>Uploaded Images/Docs:</h3>
                  <img src={data.medicalImages} alt="Medical" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorForm;