const userService = require('../services/userServices');
const User = require('../models/user');
const idGenerator = require('../utils/uniqueIdGenerator');
const { json } = require('express');
const healthRecordService = require('../services/healthRecordService')
const HealthRecord = require('../models/healthRecord');
const { generateHash, verify } = require('../utils/bcryptUtil');


class UserController {
    async createUser(req, res) {
        try {
            req.body.isDeleted = false;
            req.body.password = await generateHash(req.body.password);
    
            // Generate and assign unique userId
            req.body.userId = await idGenerator("USER-");
            if (!req.body.userId) {
                return res.status(500).json({"error":"failed to generate user id"})
            }
    
            // Assign additional IDs based on user type
            if (req.body.userType === "Patient") {
                req.body.patientId = await idGenerator("PAT-");
            } else if (req.body.userType === "Doctor") {
                req.body.doctorId = await idGenerator("DOC-");
            } else if (req.body.userType === "Admin") {
                req.body.adminId = await idGenerator("ADM-");
            }
    
            // Log the complete request body
            console.log("Request body:", req.body);
    
            // Create user
            const user = await userService.createUser(req.body);
            if (req.body.userType === "Patient") {
              const healthRecord = await healthRecordService.createHealthRecordForUser(req.body);
              console.log("Health Record Created:", healthRecord);
            }
            return res.status(200).json(user)
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({"error":error.message})
        }
    }
    

  async getUserByUserId(req, res) {
    const { id } = req.query;
    try {
      const user = await userService.getUserByUserId(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({"error":"user not found"})
      }
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getUserByPatientId(req, res) {
    const { id } = req.query;
    try {
      const user = await userService.getUserByPatientId(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        errorHandler(res,500,json({"error":"user not found"}))
      }
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getUserByDoctorId(req, res) {
    const { id } = req.query;
    try {
      const user = await userService.getUserByDoctorId(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        errorHandler(res,500,json({"error":"user not found"}))
      }
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getUserByAdminId(req, res) {
    const { id } = req.query;
    try {
      const user = await userService.getUserByAdminId(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        errorHandler(res,500,json({"error":"user not found"}))
      }
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }

  async updateUser(req, res) {
    const { id } = req.query;
    try {
      const updatedUser = await userService.updateUser(id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({"error":error.message})
    }
  }

  async deleteUser(req, res) {
    const { id } = req.query;
    try {
      await userService.deleteUser(id);
      return errorHandler(res,500,json({"error":""}))
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getAllPatients(req, res) {
    try {
      const users = await userService.getAllPatients();
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getAllDoctors(req, res) {
    try {
      const users = await userService.getAllDoctors();
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getAllAdmins(req, res) {
    try {
      const users = await userService.getAllAdmins();
      return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({"error":error.message})
    }
  }
  async getUnAcceptedDoctors(req, res){
    try {
      const {patientId} = req.query;
      const doctors = await userService.getUnacceptedDoctors(patientId);
      console.log("taken doctors",doctors);
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({"error": error.message})
    }
  }
  async getUserCount(req, res){
    try {
      const userCount = await userService.getAllUserCount();
      return res.status(200).json(userCount);
    } catch (error) {
      return res.status(500).json({"error":error.message});
    }
  }
  async getPatientCount(req, res){
    try {
      const patientCount = await userService.getAllPatientsCount();
      return res.status(200).json(patientCount);
    } catch (error) {
      return res.status(500).json({"error":error.message});
    }
  }
  async getDoctorCount(req, res){
    try {
      const doctorCount = await userService.getAllDoctorCount();
      return res.status(200).json(doctorCount);
    } catch (error) {
      return res.status(500).json({"error":error.message});
    }
  }
  async getPatientsBySickleCellType(req, res){
    try {
      const {sickleCellType} = req.query;
      const patients = await userService.getPatientsBySickleCellType(sickleCellType);
      return res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }
  async getPatientsCountBySickleCellType(req, res){
    try {
      const {sickleCellType} = req.query;
      const patientCount = await userService.getPatientCountBySickleCellType(sickleCellType);
      return res.status(200).json(patientCount);
    } catch (error) {
      res.status(500).json({"error":error.message});
    }
  }
  async login(req, res){
    try{
        const {email, password} = req.body;
        const user = await userService.login(email);
        const isValidate = await verify(password, user.password);
        if (isValidate){
          res.status(200).json(user);
        }else{
          res.status(404).json({"error":"data incorrect"});
        }  
    }catch(error){
        res.status(401).json({"error":error.message})
    }
    
  }
}

module.exports = new UserController();