import React, { useState, useEffect } from 'react';
import bgImg from "../../assets/abc.gif";
import { ethers } from 'ethers';
import abi from './contractJson/Medicalsys.json'; // Update path as per your project structure
import PatientForm from './PatientForm/PatientForm';
import DoctorForm from './PatientForm/DoctorForm';

function BlockChain() {
  const [state, setState] = useState({ provider: null, signer: null, contract: null });
  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x4d3Daf9b7876befF2D3b3A5400C6fD9AA15943D0";
      const contractABI = abi.abi; // Ensure this path is correct

      try {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts"
          });
          window.ethereum.on("accountChanged",()=>{
            window.location.reload()
          })
          setAccount(accounts[0]); // Assuming you want the first account

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          console.log("Contract instance:", contract);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask or another Ethereum provider extension.");
        }
      } catch (error) {
        alert("Error connecting to Ethereum network. Please check MetaMask or another provider extension.");
        console.error(error);
      }
    };

    template();
  }, []);


  const appStyle = {
    backgroundImage: `url(${bgImg})`, // Replace with your image path
    backgroundAttachment: 'fixed'
  };
  return (
    
    <div className='App' style={appStyle} className='w-full h-[80vh] text-white'>
      <div className='text-xl flex justify-center'>Connected Account: {account}</div>
        <PatientForm/>
        {/* <DoctorForm/> */}
    </div>
  );
}

export default BlockChain;
