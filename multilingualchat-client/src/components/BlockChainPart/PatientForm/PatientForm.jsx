// import React, { useState } from 'react';

// const PatientForm = () => {
//   const [formData, setFormData] = useState({
//     patientId: '',
//     patientName: '',
//     patientAge: '',
//     patientAddress: '',
//     patientContact: '',
//     patientEmail: '',
//     medicalHistory: '',
//     medicalImages: null
//   });
//   const [encryptedData, setEncryptedData] = useState('');
//   const [patientId, setPatientId] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       const response = await fetch('http://localhost:5000/api/patient', {
//         method: 'POST',
//         body: data
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       console.log(result);

//       // Display encrypted data on the screen
//       setEncryptedData(result.encryptedData);
//       setPatientId(result.patientId);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const truncateString = (str, maxLen) => {
//     if (str.length <= maxLen) return str;
//     return str.substring(0, maxLen) + '...';
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="Patient ID" />
//       <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Patient Name" />
//       <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} placeholder="Patient Age" />
//       <input type="text" name="patientAddress" value={formData.patientAddress} onChange={handleChange} placeholder="Patient Address" />
//       <input type="text" name="patientContact" value={formData.patientContact} onChange={handleChange} placeholder="Patient Contact" />
//       <input type="email" name="patientEmail" value={formData.patientEmail} onChange={handleChange} placeholder="Patient Email" />
//       <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History" />
//       <input type="file" name="medicalImages" onChange={handleChange} />
//       <button type="submit">Submit</button>

//       {encryptedData && (
//         <div>
//           <h2>Encrypted Data</h2>
//           <p>Patient ID: {patientId}</p>
//           <p>Patient Data: {truncateString(encryptedData, 64)}</p>
//         </div>
//       )}
//     </form>
//   );
// };

// export default PatientForm;



import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "./../contractJson/MedicalData.json";
import { useUser } from '@clerk/clerk-react';


const PatientForm = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    patientId: user ? user.id : '',
    patientName: user ? user.fullName : '',
    patientAge: 28,
    patientAddress: new Date().toLocaleString(),
    patientContact: '',
    patientEmail: '',
    medicalHistory: '',
    medicalImages: null
  });

  useEffect(()=>{
    console.log(user);
  },[formData]);

  const [encryptedData, setEncryptedData] = useState('');
  const [patientId, setPatientId] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const API_KEY = '13c94fbc4023cead4835'
  const API_SECRET = '75adbb7a9e2c344e79c9b837367f310dc1c48e6a7fb9d73a73c1940b4efb1ca2'

  // Pinata API URL
  const PINATA_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
  
  const getIpfsUrl = async (file)=>{
    const formData = new FormData();
    formData.append('file', file);

    try{
      const response = await fetch(PINATA_URL,{
        method : 'POST',
        headers : {
          // 'Content-Type': 'multipart/form-data',
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET,
        },
        body : formData
      });
      const res = await response.json();
      console.log(res);
      return `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`
    }
    catch(err){
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    async function connectToMetaMask() {
      try {
        const { ethereum } = window;
        if (ethereum) {
          // Request accounts from MetaMask
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]); // Assuming you want the first account

          // Listen for account changes
          ethereum.on('accountsChanged', (newAccounts) => {
            setAccount(newAccounts[0]);
            window.location.reload(); // Reload the page or handle account change
          });

          // Create provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = '0x6e09793E9466D4B5Dea8474236E7f8808fb07be2'; // Replace with your contract address
          const contractABI = abi.abi; // Replace with your contract ABI

          const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contractInstance);
        } else {
          alert('Please install MetaMask or another Ethereum provider extension.');
        }
      } catch (error) {
        alert('Error connecting to Ethereum network. Please check MetaMask or another provider extension.');
        console.error(error);
      }
    }

    connectToMetaMask();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    let imgString = null;

    if(files){
      // const response = await fetch('http://localhost:5000/api/get-image-string', {
      //   body : imageData,
      //   method : 'POST'
      // });
      // const res = await response.json();
      // if(res.success){
      //   imgString = res.image;
      // }
      // console.log('lauda nahi aaya imageString');
      imgString = await getIpfsUrl(files[0]);
      console.log('imageUrl', imgString);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? imgString : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      // Convert form data to JSON string (you might need to adjust this based on your data structure)
      const dataToEncrypt = JSON.stringify(formData);
      // Example encryption (replace with your encryption method)
      const encryptionKey = 'yourEncryptionKey'; // Replace with your encryption key
      const encryptedData = encryptData(dataToEncrypt, encryptionKey);

      // Store encrypted data in state
      setEncryptedData(encryptedData);
      console.log(encryptedData);
      const JsonData = encryptedData.split(' [encrypted')[0];

      // Call smart contract function to add patient data
      const tx = await contract.addPatientData(formData.patientId, JsonData, {
        value: ethers.utils.parseEther('0.001') // Sending 0.001 ETH with the transaction
      });
      await tx.wait();
      console.log('Transaction successful!');

      // Update UI with results
      setPatientId(formData.patientId);
      alert('Transaction successful!'); // You can replace this with a more elegant UI update

    } catch (error) {
      console.error('Error handling data', error);
      alert('Error submitting data');
    }
  };

  const encryptData = (data, encryptionKey) => {
    // Example encryption method (replace with your actual encryption logic)
    return data + ' [encrypted with ' + encryptionKey + ']';
  };

  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen) return str;
    return str.substring(0, maxLen) + '...';
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
      {/* <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} placeholder="Patient ID"  className='px-2 py-1 m-1 bg-transparent '/> */}
      {/* <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Patient Name"  className='px-2 py-1 m-1 bg-transparent '/> */}
      {/* <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} placeholder="Patient Age"  className='px-2 py-1 m-1 bg-transparent '/> */}
      {/* <input type="text" name="patientAddress" value={formData.patientAddress} onChange={handleChange} placeholder="Patient Address"  className='px-2 py-1 m-1 bg-transparent '/> */}
      {/* <input type="text" name="patientContact" value={formData.patientContact} onChange={handleChange} placeholder="Patient Contact"  className='px-2 py-1 m-1 bg-transparent '/> */}
      {/* <input type="email" name="patientEmail" value={formData.patientEmail} onChange={handleChange} placeholder="Patient Email"  className='px-2 py-1 m-1 bg-transparent '/> */}
      <div className='flex text-center text-3xl my-3 justify-center '>Add Medical Records...</div>
      <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Prescription Description / Status"  className='px-2 py-1 m-1 bg-transparent '/>
      <input type="file" name="medicalImages" onChange={handleChange} />
      <div>{new Date().toString()}</div>
      <button type="submit" className='px-2 py-1 m-1 '>Submit</button>

      {encryptedData && (
        <div>
          <h2>Encrypted Data</h2>
          <p>Patient ID: {patientId}</p>
          <p>Patient Data: {truncateString(encryptedData, 64)}</p>
          <p>Transaction Hash: {encryptedData}</p>
        </div>
      )}
    </form>
  );
};

export default PatientForm;
