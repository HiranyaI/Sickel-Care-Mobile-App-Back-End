const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  medicineId: {
    type: String,
    required: true,
    unique: true
  },
  medicines: {
    morning: { type: [String], default: [] },
    day: { type: [String], default: [] }, 
    night: { type: [String], default: [] } 
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
