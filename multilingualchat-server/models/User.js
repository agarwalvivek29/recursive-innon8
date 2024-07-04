const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    clerkId : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    mobile : {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: false
    },
    age : {
        type: Number,
        required: false
    },
    gender : {
        type: String,
        required: false
    },
    bloodGroup : {
        type: String,
        required: false
    },
    weight : {
        type: Number,
        required: false
    },
    height : {
        type: Number,
        required: false
    },
    role : {
        type: String,
        required: false
    },
    organisation : {
        type: String,
        required: false
    },
    specialisation : {
        type: [String],
        required: false
    },
    qualification : {
        type: [String],
        required: false
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;