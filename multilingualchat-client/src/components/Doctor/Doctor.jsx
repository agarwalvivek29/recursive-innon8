// import React, { useEffect, useState } from 'react';

// const Doctor = () => {
//     const [doctor, setDoctor] = useState(null);
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         // Simulating data fetching (replace with actual fetch call)
//         // Example data for doctor and appointments
//         const fetchDoctorAndAppointments = async () => {
//             try {
//                 // Replace with actual API endpoints or data fetching logic
//                 const doctorResponse = await fetch('/api/doctor');
//                 const doctorData = await doctorResponse.json();

//                 const appointmentsResponse = await fetch('/api/appointments');
//                 const appointmentsData = await appointmentsResponse.json();

//                 setDoctor(doctorData);
//                 setAppointments(appointmentsData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchDoctorAndAppointments();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {doctor && (
//                 <>
//                     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//                         <div className="flex items-center mb-4">
//                             <div className="flex-1">
//                                 <div className="text-xl font-bold">{doctor.name}</div>
//                                 <div className="text-sm text-gray-600">{doctor.email}</div>
//                                 <div className="text-sm text-gray-600">{doctor.specialization}</div>
//                                 <div className="text-sm text-gray-600">{doctor.qualifications}</div>
//                             </div>
//                             <div className="flex-1 text-right">
//                                 {/* Additional info or actions can be added here */}
//                             </div>
//                         </div>
//                     </div>

//                     <table className="w-full bg-white rounded-lg shadow-md">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border px-4 py-2">Patient ID</th>
//                                 <th className="border px-4 py-2">Patient Name</th>
//                                 <th className="border px-4 py-2">Appointment Date</th>
//                                 <th className="border px-4 py-2">Preferred Duration</th>
//                                 <th className="border px-4 py-2">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {appointments.map(appointment => (
//                                 <tr key={appointment.id} className={appointment.status === 'active' ? 'bg-green-100' : 'bg-red-100'}>
//                                     <td className="border px-4 py-2">{appointment.patientId}</td>
//                                     <td className="border px-4 py-2">{appointment.patientName}</td>
//                                     <td className="border px-4 py-2">{appointment.appointmentDate}</td>
//                                     <td className="border px-4 py-2">{appointment.preferredDuration}</td>
//                                     <td className="border px-4 py-2">{appointment.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Doctor;


import React from 'react';
import "./Doctor.css"
const Doctor = () => {
    // Example static data for doctor and appointments
    const doctor = {
        name: 'Dr. John Doe',
        email: 'john.doe@example.com',
        specialization: 'Cardiologist',
        qualifications: 'MD in Cardiology'
    };

    const appointments = [
        {
            id: 1,
            patientId: '001',
            patientName: 'Jane Smith',
            appointmentDate: '2024-07-10',
            preferredDuration: '10:00 AM - 10:30 AM',
            status: 'active'
        },
        {
            id: 2,
            patientId: '002',
            patientName: 'Michael Johnson',
            appointmentDate: '2024-07-12',
            preferredDuration: '11:00 AM - 11:30 AM',
            status: 'blocked'
        },
        {
            id: 3,
            patientId: '003',
            patientName: 'Michael Johnson',
            appointmentDate: '2024-07-12',
            preferredDuration: '11:00 AM - 11:30 AM',
            status: 'blocked'
        },
        {
            id: 4,
            patientId: '004',
            patientName: 'Michael Johnson',
            appointmentDate: '2024-07-12',
            preferredDuration: '11:00 AM - 11:30 AM',
            status: 'active'
        },
        {
            id: 5,
            patientId: '005',
            patientName: 'Michael Johnson',
            appointmentDate: '2024-07-12',
            preferredDuration: '11:00 AM - 11:30 AM',
            status: 'blocked'
        }
        // Add more appointments as needed
    ];

    return (
        <div className="container mx-auto p-4">
            {doctor && (
                <>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <div className="flex items-center mb-4">
                            <div className="flex-1">
                                <div className="text-xl font-bold">{doctor.name}</div>
                                <div className="text-sm text-gray-600">{doctor.email}</div>
                                <div className="text-sm text-gray-600">{doctor.specialization}</div>
                                <div className="text-sm text-gray-600">{doctor.qualifications}</div>
                            </div>
                            <div className="flex-1 text-right">
                                {/* Additional info or actions can be added here */}
                            </div>
                        </div>
                    </div>

                    <table className="w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Patient ID</th>
                                <th className="border px-4 py-2">Patient Name</th>
                                <th className="border px-4 py-2">Appointment Date</th>
                                <th className="border px-4 py-2">Preferred Duration</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Patient Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.id} className={appointment.status === 'active' ? 'bg-green-100' : 'bg-red-100'}>
                                    <td className="border px-4 py-2">{appointment.patientId}</td>
                                    <td className="border px-4 py-2">{appointment.patientName}</td>
                                    <td className="border px-4 py-2">{appointment.appointmentDate}</td>
                                    <td className="border px-4 py-2">{appointment.preferredDuration}</td>
                                    <td className="border px-4 py-2">{appointment.status}</td>
                                    <td className="border px-4 py-2"><button className='button'>Click Here</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Doctor;
