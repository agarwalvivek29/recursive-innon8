const express = require('express');
const router = express.Router();
const Appointment = require('./../models/Appointment');

router.post('/', async (req,res) => {
    const { doctorId, patientId, time, date } = req.body;

    if(!doctorId || !patientId || !time || !date ){
        throw new Error('doctorId, patientId and time are required');
    }

    const appointment = new Appointment({
        doctorId,
        patientId,
        time
    });

    await appointment.save();

    res.status(200).send({
        success : true,
        appointment
    });
});

router.post('/check', async (req,res) => {
    const { doctorId, time, date } = req.body;

    if(!doctorId || !time || !date){
        throw new Error('doctorId, time and date are required');
    }

    const appointment = await Appointment.findOne({
        doctorId,
        time,
        date
    });

    if(appointment){
        res.status(200).send({
            success : true,
            appointment
        });
    }else{
        res.status(200).send({
            success : false
        });
    }
});

router.post('/delete', async (req,res) => {
    const { appointmentId } = req.body;

    if(!appointmentId){
        throw new Error('appointmentId is required');
    }

    const appointment = await Appointment.findById(appointment)

    if(!appointment){
        throw new Error('Appointment not found');
    }
});

module.exports = router;
