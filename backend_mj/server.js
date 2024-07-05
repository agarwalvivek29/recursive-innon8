const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
// const { ethers } = require('hardhat');
const { Web3 } = require('web3');
const abi = require("./abi.json");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to Ethereum network
const web3 = new Web3('https://sepolia.infura.io/v3/06c2e218952c4de29a80310937b1b753');
const privateKey = '1d1fe5bda8806ae659a52c4827219e44685ac6234222ef78571ab596e37a0527'; // Replace with your actual private key
// const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(wallet);
// web3.eth.defaultAccount = wallet.address;

const contractAddress = '0x6e09793E9466D4B5Dea8474236E7f8808fb07be2'; // Replace with your actual contract address
const contractABI = abi.abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// console.log("2nd Contract instance:", contract); // Logging the contract instance

const patientData = {}; // In-memory storage for patient data
const encryptionKeys = {}; // In-memory storage for encryption keys

app.post('/api/get-image-string',upload.single('medicalImages'), async(req,res)=>{
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    const image = req.file.buffer;
    const imgData = image.toString('base64')
    res.send({
        success : true,
        image : imgData
    });
})

app.post('/api/patient', upload.single('medicalImages'), async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const { patientId, patientName, patientAge, patientAddress, patientContact, patientEmail, medicalHistory } = req.body;
    
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    
    const image = req.file.buffer; // Binary data of the image
    // res.send({
    //     success : true,
    //     image : image.buffer.
    // })

    const dataToEncrypt = JSON.stringify({
      patientName,
      patientAge,
      patientAddress,
      patientContact,
      patientEmail,
      medicalHistory,
      medicalImages: image.toString('base64'), // Convert binary to base64 string
    });

    const encryptionKey = crypto.randomBytes(32).toString('hex'); // Example key generation
    const encryptedData = encryptData(dataToEncrypt, encryptionKey);
    console.log(encryptedData);

    patientData[patientId] = encryptedData;
    encryptionKeys[patientId] = encryptionKey;

    // Store encrypted data on blockchain
    const tx = await contract.methods.addPatientData(patientId, encryptedData).call();
    await tx.wait();

    console.log('Data submitted successfully:', patientId);
    res.status(200).send({ message: 'Data submitted successfully', patientId, encryptedData });
  } catch (error) {
    console.error('Error handling data', error);
    res.status(500).send({ error: 'Error submitting data' });
  }
});

app.get('/api/patient/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    console.log(patientId);
    // Fetch encrypted data from blockchain
    const data = await contract.methods.getPatientData(patientId).call();
    console.log(data);
    console.log(data.length > 0 ? data[0].encryptedData : "");

    if (data.length === 0) {
      return res.status(404).send({ error: 'No data found for this patient ID' });
    }

    let encryptedData = []
    for(let i=0; i<data.length; i++){
        encryptedData.push(JSON.parse(data[i].encryptedData.split(' [en')[0]))
    }
    res.json(encryptedData);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send({ error: 'Error fetching data' });
  }
});

function encryptData(data, encryptionKey) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.alloc(16, 0));
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptData(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.alloc(16, 0));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});