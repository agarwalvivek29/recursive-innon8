// const express = require('express');
// const router = express.Router();
// const Appointment = require('./../models/Appointment');
// const User = require('../models/User');

// const getStartTimes = (startHour, endHour) => {
//     const startTimes = [];
//     const start = new Date();
//     start.setHours(startHour, 0, 0, 0);
    
//     const end = new Date();
//     end.setHours(endHour, 0, 0, 0);
    
//     while (start < end) {
//         const hours = start.getHours().toString().padStart(2, '0');
//         const minutes = start.getMinutes().toString().padStart(2, '0');
//         startTimes.push(`${hours}:${minutes}`);
//         start.setMinutes(start.getMinutes() + 20);
//     }

//     return startTimes;
// };

// const getNextDates = (numDays) => {
//     const dates = [];
//     const today = new Date();
    
//     for (let i = -1; i < numDays; i++) {
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + i + 1); // Increment by i + 1 days
//         const formattedDate = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getFullYear()}`;
//         dates.push(formattedDate);
//     }
//     return dates;
// };

// router.post('/', async (req,res) => {
//     const { doctorId, patientId, time, date } = req.body;

//     if(!doctorId || !patientId || !time || !date ){
//         throw new Error('doctorId, patientId and time are required');
//     }

//     const doctor = await User.findOne({ _id : doctorId });

//     const appointment = new Appointment({
//         doctorId,
//         patientId,
//         time
//     });

//     await appointment.save();

//     res.status(200).send({
//         success : true,
//         appointment
//     });
// });

// router.get('/getAll/:doctorId', async (req,res)=>{

//     const doctorId = req.params.doctorId;
//     const dates = getNextDates(5);
    
//     for(let i=0; i<dates.length; i++){

//         const appointments = await Appointment.find({
//             date : dates[i],
//             doctorId : new ObjectId(doctorId)
//         });

//         if(appointments.length === 0){
//             const doctor = await User.findOne({ _id : new ObjectId(doctorId) });
//             if(!doctor){
//                 throw new Error('Doctor not found');
//             }
//             const times = getStartTimes(doctor.availability.start, doctor.availability.end);
//             for(let j=0;j<times.length;j++){
//                 const appoint = await Appointment.create({
//                     doctorId,
//                     time : times[j],
//                     date : dates[i]
//                 });
//                 await appoint.save();
//             }
//         }

//         const allAppointments = await Appointment.find({
//             doctorId : new ObjectId(doctorId),
//             date : { $in : dates }
//         });

//         res.status(200).send({
//             success : true,
//             data : allAppointments
//         });
//     }
// });

// router.post('/check', async (req,res) => {
//     const { doctorId, time, date } = req.body;

//     if(!doctorId || !time || !date){
//         throw new Error('doctorId, time and date are required');
//     }

//     if(appointment){
//         res.status(200).send({
//             success : true,
//             appointment
//         });
//     }else{
//         res.status(200).send({
//             success : false
//         });
//     }
// });

// router.post('/delete', async (req,res) => {
//     const { appointmentId } = req.body;

//     if(!appointmentId){
//         throw new Error('appointmentId is required');
//     }

//     const appointment = await Appointment.findById(appointment)

//     if(!appointment){
//         throw new Error('Appointment not found');
//     }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Appointment = require('./../models/Appointment');
const User = require('../models/User');
const { ObjectId } = require('mongoose').Types;

const getStartTimes = (startHour, endHour) => {
    const startTimes = [];
    const start = new Date();
    start.setHours(startHour, 0, 0, 0);
    
    const end = new Date();
    end.setHours(endHour, 0, 0, 0);
    
    while (start < end) {
        const hours = start.getHours().toString().padStart(2, '0');
        const minutes = start.getMinutes().toString().padStart(2, '0');
        startTimes.push(`${hours}:${minutes}`);
        start.setMinutes(start.getMinutes() + 20);
    }

    return startTimes;
};

const getNextDates = (numDays) => {
    const dates = [];
    const today = new Date();
    
    for (let i = -1; i < numDays; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i + 1); // Increment by i + 1 days
        const formattedDate = `${nextDate.getDate().toString().padStart(2, '0')}/${(nextDate.getMonth() + 1).toString().padStart(2, '0')}/${nextDate.getFullYear()}`;
        dates.push(formattedDate);
    }
    return dates;
};

router.post('/', async (req, res) => {
    try {
        const { doctorId, patientId, time, date } = req.body;

        if (!doctorId || !patientId || !time || !date) {
            throw new Error('doctorId, patientId, time, and date are required');
        }

        const doctor = await User.findOne({ _id: doctorId });
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        const appointment = new Appointment({
            doctorId,
            patientId,
            time,
            date
        });

        await appointment.save();

        res.status(200).send({
            success: true,
            appointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: error.message
        });
    }
});

router.get('/getAll/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const dates = getNextDates(5);

        const appointmentsPromises = dates.map(async (date) => {
            try {
                const appointments = await Appointment.find({
                    date,
                    doctorId: new ObjectId(doctorId)
                });

                if (appointments.length === 0) {
                    const doctor = await User.findOne({ _id: new ObjectId(doctorId) });
                    if (!doctor) {
                        throw new Error('Doctor not found');
                    }
                    const times = getStartTimes(doctor.availability.start, doctor.availability.end);
                    for (let j = 0; j < times.length; j++) {
                        const appoint = new Appointment({
                            doctorId,
                            time: times[j],
                            date
                        });
                        await appoint.save();
                    }
                }
            } catch (error) {
                console.error(error);
                throw error; // Re-throw to propagate the error to the catch block below
            }
        });

        await Promise.all(appointmentsPromises);

        const allAppointments = await Appointment.find({
            doctorId: new ObjectId(doctorId),
            date: { $in: dates }
        });

        res.status(200).send({
            success: true,
            data: allAppointments
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: error.message
        });
    }
});

router.post('/check', async (req, res) => {
    try {
        const { doctorId, time, date } = req.body;

        if (!doctorId || !time || !date) {
            throw new Error('doctorId, time, and date are required');
        }

        const appointment = await Appointment.findOne({
            doctorId: new ObjectId(doctorId),
            time,
            date
        });

        if (appointment) {
            res.status(200).send({
                success: true,
                appointment
            });
        } else {
            res.status(200).send({
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: error.message
        });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            throw new Error('appointmentId is required');
        }

        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!appointment) {
            throw new Error('Appointment not found');
        }

        res.status(200).send({
            success: true,
            msg: 'Appointment deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: error.message
        });
    }
});

module.exports = router;
