const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        unique: true,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Message', messageSchema);;
