const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    patientId: {
      type: String,
      sparse: true, 
      trim: true,
    },
    doctorId: {
      type: String,
      sparse: true, 
      trim: true,
    },
    adminId: {
      type: String,
      sparse: true, 
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    userType: {
      type: String,
      required: true,
    },
    sickleCellType: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    secConNumber: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: 0, 
    },
    gender: {
      type: String,
    },
    doctorLicenseNumber: {
      type: String,
      trim: true,
      sparse: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    isDeleted:{
       type:Boolean,
    }
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);


module.exports = User;