const Medicine = require('../models/medicineRecords');

class MedicineService {

  async createMedicine(medicineData) {
    try {
      const medicine = new Medicine(medicineData);
      return await medicine.save();
    } catch (error) {
      throw new Error(`Error creating medicine record: ${error.message}`);
    }
  }

  async getMedicineByPatientId(patientId, userId) {
    try {
      return await Medicine.findOne({ patientId:patientId, userId:userId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching medicines: ${error.message}`);
    }
  }


  async getMedicinesByUserId(userId) {
    try {
      return await Medicine.findOne({ userId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching medicines: ${error.message}`);
    }
  }

  async getMedicineById(medicineId) {
    try {
      return await Medicine.findOne({ _id: medicineId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching medicine record: ${error.message}`);
    }
  }

  async updateMedicineRecord(medicineId, medicineData) {
    try {
      return await Medicine.findOneAndUpdate(
        { _id: medicineId, isDeleted: false },
        { $set: medicineData },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating medicine record: ${error.message}`);
    }
  }


  async deleteMedicine(medicineId) {
    try {
      return await Medicine.findOneAndUpdate(
        { _id: medicineId, isDeleted: false },
        { $set: { isDeleted: true } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error deleting medicine record: ${error.message}`);
    }
  }
}
module.exports = new MedicineService();
