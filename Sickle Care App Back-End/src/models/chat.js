const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatId:{
        type: String
    },
    requestId:{
        type: String
    },
    patientId:{
        type: String
    },
    doctorId:{
        type: String
    },
    patientName:{
        type: String
    },
    doctorName:{
        type: String
    }
});

module.exports = mongoose.model("Chat", chatSchema);