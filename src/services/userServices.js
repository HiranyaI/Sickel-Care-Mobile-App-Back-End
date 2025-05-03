const User = require('../models/user');
const docRequestService = require('../services/docRequestService')
class UserService {
  async createUser(userData) {
    try {
      const user = new User(userData);
      console.log(userData)
      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserByUserId(id) {
    try {
      const user = await User.findOne({ userId: id, isDeleted: false });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
  async getUserByPatientId(id) {
    try {
      const user = await User.findOne({ patientId: id, isDeleted: false }); 
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
  async getUserByDoctorId(id) {
    try {
      const user = await User.findOne({ doctorId: id, isDeleted: false }); 
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
  async getUserByAdminId(id) {
    try {
      const user = await User.findOne({ adminId: id, isDeleted: false });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
  async updateUser(id, updatedUserData) {
    try {
      const user = await User.findOneAndUpdate(
        { userId: id, isDeleted: false }, // Filter by isDeleted: false
        {$set: {updatedUserData}},
        { new: true }
      );
      if (!user) {
        throw new Error('User not found or deleted');
      }
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      const result = await User.updateOne(
        { userId: id, isDeleted: false }, 
        { $set: { isDeleted: true } } 
      );
  
      if (result.nModified === 0) {
        throw new Error('User not found or already deleted');
      }
  
      return { message: 'User successfully soft deleted' };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
  

  async getAllUsers() {
    try {
      return await User.find({ isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  async getAllUserCount(){
    try {
      return await User.countDocuments({isDeleted:false})
    } catch (error) {
      throw new Error(`error when counting users: ${error.message}`)
    }
  }
  async getAllPatients() {
    try {
      return await User.find({userType:"Patient", isDeleted: false }); 
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  async getAllPatientsCount(){
    try {
      return await User.countDocuments({userType:"Patient", isDeleted: false });
    } catch (error) {
      throw new Error(`error when counting patients: ${error.message}`);
    }
  }
  async getAllDoctors() {
    try {
      return await User.find({userType:"Doctor", isDeleted: false }); 
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  async getAllDoctorCount(){
    try {
      return await User.find({userType:"Doctor", isDeleted: false });
    } catch (error) {
      throw new Error(`error when counting doctors: ${error.message}`);
    }
  }

  async getUnacceptedDoctors(patientId){
    try {
      const accpetedDoctorsId = await docRequestService.getAcceptedDoctorsIdsByPatientId(patientId);
      console.log("doctorids", accpetedDoctorsId)
      const unacceptedDoctors = await User.find({userType:"Doctor", doctorId:{$nin:accpetedDoctorsId}});
      return unacceptedDoctors;
    } catch (error) {
      throw new Error(`error when fetching doctors: ${error.message}`)
    }
  }
  async getPatientsBySickleCellType(type){
    try {
      return await User.find({sickleCellType: type, isDeleted: false})
    } catch (error) {
      throw new Error(`error when fetching users: ${error.message}`);
    }
  }
  async getPatientCountBySickleCellType(type){
    try {
      return await User.find({sickleCellType: type, isDeleted: false})
    } catch (error) {
      throw new Error(`error when fetching users: ${error.message}`);
    }
  }
  async getAllAdmins() {
    try {
      return await User.find({userType:"Admin", isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  async login(email) {
    try {
      const user = await User.findOne({ email, isDeleted: false }); // Find user by email
      if (!user) {
        throw new Error('User not found');
      }
      return  user;
    } catch (error) {
      throw new Error(`Error during login: ${error.message}`);
    }
  }
}

module.exports = new UserService();
