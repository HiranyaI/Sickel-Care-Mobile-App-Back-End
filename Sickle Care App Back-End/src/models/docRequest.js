const mongoose = require('mongoose')

const docRequestSchema = new mongoose.Schema({
        requestId: {
            type: String,
            required: true,
            trim: true
        },
        patientId: {
            type: String,
            required: true,
            trim: true
        },
        doctorId: {
            type: String,
            required: true,
            trim: true
        },
        patientName:{
            type: String, 
            required: true,
        },
        date:{
            type: Date,
            default: Date.now   
        },
        isAccepted:{
            type: String
        },
    },
    {
    timestamps: true,
});
module.exports = mongoose.model('DoctorRequest',docRequestSchema);