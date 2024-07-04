const { Schema, ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const AppointmentSchema = new Schema({
    time : {
        type: String,
        required: true
    },
    date : {
        type : String,
        required: true
    },
    doctorId : {
        type: ObjectId,
        required: true
    },
    patientId : {
        type: ObjectId,
        required: false
    },
});

const Appointment = mongoose.model('Appointment',AppointmentSchema);
module.exports = Appointment;