import React, { useEffect, useState } from 'react';

const DoctorsList = () => {
    // Example static data for doctors
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: 'Dr. John Doe',
            specialization: 'Cardiologist',
            qualifications: 'MD in Cardiology',
            organization: 'Heart Clinic'
        },
        {
            id: 2,
            name: 'Dr. Jane Smith',
            specialization: 'Pediatrician',
            qualifications: 'MD in Pediatrics',
            organization: 'Kids Hospital'
        },
        // Add more doctors as needed
    ]);

    const handleBookAppointment = (doctorId) => {
        // Implement booking logic or navigate to appointment booking page
        console.log(`Booking appointment with doctor ID ${doctorId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Specialization</th>
                        <th className="border px-4 py-2">Qualifications</th>
                        <th className="border px-4 py-2">Organization</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td className="border px-4 py-2">{doctor.id}</td>
                            <td className="border px-4 py-2">{doctor.name}</td>
                            <td className="border px-4 py-2">{doctor.specialization}</td>
                            <td className="border px-4 py-2">{doctor.qualifications}</td>
                            <td className="border px-4 py-2">{doctor.organization}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleBookAppointment(doctor.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Book Appointment
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorsList;
