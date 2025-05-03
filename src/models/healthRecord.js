const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  recordId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  patientId: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
  },
  waterIntake: {
    glassAmount: { type: Number, default: 0 },
    glassCount: { type: Number,  default: 0 },
  },
  diet: {
    breakfast: {
      Iron: {type: String},
      Folate_VitaminB9: {type: String},
      VitaminB12: {type: String},
      VitaminC: {type: String},
      Zinc: {type: String},
      Magnesium: {type: String},
      Omega_3FattyAcids: {type: String},
      Protein: {type: String},
      Calcium_VitaminD: {type: String},
      Hydration_Fluids: {type: String},
    },
    lunch: {
      Iron: {type: String},
      Folate_VitaminB9: {type: String},
      VitaminB12: {type: String},
      VitaminC: {type: String},
      Zinc: {type: String},
      Magnesium: {type: String},
      Omega_3FattyAcids: {type: String},
      Protein: {type: String},
      Calcium_VitaminD: {type: String},
      Hydration_Fluids: {type: String},
    },
    dinner: {
      Iron: {type: String},
      Folate_VitaminB9: {type: String},
      VitaminB12: {type: String},
      VitaminC: {type: String},
      Zinc: {type: String},
      Magnesium: {type: String},
      Omega_3FattyAcids: {type: String},
      Protein: {type: String},
      Calcium_VitaminD: {type: String},
      Hydration_Fluids: {type: String},
    }
  },
  alcoholConsumption: {
    shotCount: { type: Number, default: 0 },
  },
  sleep: {
    hours: { type: Number},
    quality: { type: String },
  },
  medicine: {
    morning: [
      {
        name: { type: String },
        isTaken: { type: Boolean }
      }
    ],
    day: [
      {
        name: { type: String },
        isTaken: { type: Boolean }
      }
    ],
    night: [
      {
        name: { type: String },
        isTaken: { type: Boolean }
      }
    ]
  },
  waterIntakePercentage: { type: Number, default: 0 },
  dietPercentage: { type: Number, default: 0 },
  alcoholPercentage: { type: Number, default: 0 },
  sleepPercentage: { type: Number, default: 0 },
  medicinePercentage: { type: Number, default: 0 },
  notes: {
    type: String,
    trim: true
  },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord;
