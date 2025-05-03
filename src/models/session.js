const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId:{
        type: String
    },
    chatId:{
        type: String
    },
    patientId:{
        type: String
    },
    doctorId:{
        type:String,
    },
    doctorName:{
        type: String
    },
    patientName:{
        type:String
    },
    dateTime:{
        type: Date
    },
    isAccepted:{
        type: String
    }
});
module.exports = mongoose.model("Session", sessionSchema);