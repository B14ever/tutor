const mongoose = require('mongoose')
const Users = new mongoose.Schema({
    FirstName: {
        type: String,
        requier: true
    },
    LastName: {
        type: String,
        require: true
    },
    Gender:{
        type: String,
        require: true
    },
    Age:{
        type: String,
        require: true
    },
    Email: {
        type: String,
        requier: true
    },
    profilePhoto: {
        type: String,
        default: 'operator.jpg'
    },
    City: {
        type: String,
        require: true,
    },
    Password:{
      type:String,
      required:true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Educational_Level: {
        type: String,
        required: true
    },
    School: {
        type: String,
        required: true
    },
    FieldOfStudy: {
        type: String,
        required: true
    },
    Language: {
        type: String,
        required: true
    },
    otp: {
        code: {
            type: Number,
            required: true
        },
        ValidUntil: {
            type: Date,
            required: true
        },
        attempts: {
            type: Number,
            default: 0
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })
module.exports = mongoose.model('Users', Users)