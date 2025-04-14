const mongoose = require('mongoose')

const dailyReportSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true,
        trim: true,
    },
    recordId: {
        type: String,
        required: true,
        trim: true,
    },
    userId:{
        type:String,
        required: true,
        trim: true,
    },
    patientId:{
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: String,
    },
    waterIntake:{
        taken: { 
            type: Number
        },
        recommended: {
            type: String,
        },
        percentage:{
            type: Number
        },
    },
    diet:{
        eaten:{
            type: [String],
        },
        recommended:{
            type: [String],
        },
        percentage:{
            type: Number
        }
    },
    sleep:{
        slept:{
            type: Number,
        },
        recommended:{
            type: Number
        },
        percentage:{
            type:Number
        }
    },
    alcoholConsumption:{
        shotsTaken:{
            type: Number
        },
        recommended:{
            shots:{
                type: Number
            },
        },
        percentage:{
            type: Number,
        }
    },
    medicine:{
        notTaken:[String],
        percentage:{
            type: Number
        }
    }
    
});

module.exports = mongoose.model('DailyReport',dailyReportSchema)