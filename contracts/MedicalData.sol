// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalData {
    address public contractOwner;

    constructor() payable {
        contractOwner = msg.sender; // Assign deployer as the contract owner
    }

    struct PatientData {
        string encryptedData;
        uint256 timestamp;
    }

    mapping(string => PatientData[]) private patientRecords;

    function addPatientData(string memory patientId, string memory encryptedData) public payable {
        require(msg.value > 0, "Please pay more than 0 ether");
        // Perform payment to the contract owner
        payable(contractOwner).transfer(msg.value);

        patientRecords[patientId].push(PatientData(encryptedData, block.timestamp));
    }

    function getPatientData(string memory patientId) public view returns (PatientData[] memory) {
        return patientRecords[patientId];
    }
}
