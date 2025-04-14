const HealthRecord = require('../models/healthRecord');
const idGenerator = require('../utils/uniqueIdGenerator');
const healthBenchmarkService = require('../services/healthBenchmarkService');
class HealthRecordService {
  async createHealthRecord(healthRecordData) {
    try {
      const healthRecord = new HealthRecord(healthRecordData,);
      return await healthRecord.save();
    } catch (error) {
      throw new Error(`Error creating health record: ${error.message}`);
    }
  }
  async createHealthRecords(healthRecordsData) {
    try {
        if (!Array.isArray(healthRecordsData) || healthRecordsData.length === 0) {
            throw new Error("Invalid data: healthRecordsData should be a non-empty array.");
        }
        
        return await HealthRecord.insertMany(healthRecordsData);
    } catch (error) {
        throw new Error(`Error creating multiple health records: ${error.message}`);
    }
}

  async getHealthRecordsByPatientId(patientId) {
    try {
      return await HealthRecord.find({ patientId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching health records: ${error.message}`);
    }
  }

  async getHealthRecordByRecordId(recordId) {
    try {
      return await HealthRecord.findOne({ recordId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching health record: ${error.message}`);
    }
  }

  async getHealthRecordsByUserId(userId) {
    try {
      return await HealthRecord.find({ userId, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching health records: ${error.message}`);
    }
  }

  async getHealthRecordsByDate(date) {
    try {
      return await HealthRecord.find({ date, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching health records: ${error.message}`);
    }
  }
  async getHealthRecordByPatientIdandDate(patientId, date) {
    try {
      return await HealthRecord.findOne({patientId:patientId, date, isDeleted: false });
    } catch (error) {
      throw new Error(`Error fetching health records: ${error.message}`);
    }
  }
  async getHealthRecordByUserIdAndDate(userId, date) {
    try {
        return await HealthRecord.findOne({
            userId,
            date: date,
            isDeleted: false
        });
    } catch (error) {
        throw new Error(`Error fetching health records by userId and date: ${error.message}`);
    }
  }
  async updateWaterIntake(recordId, waterIntake) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: {waterIntake: waterIntake } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating water intake: ${error.message}`);
    }
  }
  async benchmarkWaterIntake(recordId, waterIntakePercentage){
    try {
      return await HealthRecord.findOneAndUpdate(
        {recordId, isDeleted:false},
        {$set:{waterIntakePercentage:waterIntakePercentage}},
        {new: true}
      )
    } catch (error) {
      throw new Error(`error when water intake: ${error.message}`);
    }
  }
  async benchmarkAlcoholConsumption(recordId, alcoholConsumptionPercentage){
    try {
      return await HealthRecord.findOneAndUpdate(
        {recordId, isDeleted:false},
        {$set:{alcoholPercentage:alcoholConsumptionPercentage}},
        {new: true}
      )
    } catch (error) {
      throw new Error(`error when water intake: ${error.message}`);
    }
  }
  async benchmarkSleep(recordId, sleepPercentage){
    try {
      return await HealthRecord.findOneAndUpdate(
        {recordId, isDeleted:false},
        {$set:{sleepPercentage:sleepPercentage}},
        {new: true}
      )
    } catch (error) {
      throw new Error(`error when water intake: ${error.message}`);
    }
  }
  async updateDiet(recordId, diet) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { diet: diet } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating diet: ${error.message}`);
    }
  }
  async benchmarkDiet(recordId, dietPercentage){
    try {
      return await HealthRecord.findOneAndUpdate(
        {recordId, isDeleted:false},
        {$set:{dietPercentage:dietPercentage}},
        {new: true}
      )
    } catch (error) {
      throw new Error(`error when water intake: ${error.message}`);
    }
  }
  async benchmarkMedicine(recordId, medicinePercentage){
    try {
      return await HealthRecord.findOneAndUpdate(
        {recordId, isDeleted:false},
        {$set:{medicinePercentage:medicinePercentage}},
        {new: true}
      )
    } catch (error) {
      throw new Error(`error when water intake: ${error.message}`);
    }
  }
  async updateAlcoholConsumption(recordId, alcoholConsumption) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { alcoholConsumption: alcoholConsumption } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating alcohol consumption: ${error.message}`);
    }
  }
  async updateSleep(recordId, sleep) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { sleep: sleep } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating sleep: ${error.message}`);
    }
  }

  async updateMedicine(recordId, medicine) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { medicine: medicine } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating medicine: ${error.message}`);
    }
  }
  async updateLatestMedicineRecord(patientId, medicine) {
    try {
        return await HealthRecord.findOneAndUpdate(
            { patientId, isDeleted: false },
            {},
            { new: true, sort: { createdAt: -1 } } // Sort by latest createdAt
        ).then((latestRecord) => {
            if (!latestRecord) {
                throw new Error("No health record found for this patient.");
            }

            // Update only the medicine field
            return HealthRecord.findByIdAndUpdate(
                latestRecord._id,
                { $set: { medicine: medicine } },
                { new: true }
            );
        });
    } catch (error) {
        throw new Error(`Error updating latest medicine record: ${error.message}`);
    }
}


  async updateNotes(recordId, notes) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { notes: notes } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating notes: ${error.message}`);
    }
  }

  async deleteHealthRecord(recordId) {
    try {
      return await HealthRecord.findOneAndUpdate(
        { recordId, isDeleted: false },
        { $set: { isDeleted: true } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error deleting health record: ${error.message}`);
    }
  }
  async getTodayHealthRecords(){
    try {
      const today = new Date().toISOString().split("T")[0]; 
      const healthRecords = await HealthRecord.find({ date: today });
      return healthRecords;
    } catch (error) {
      throw new Error(`error when fetching data: ${error.message}`);
    }
  }
  async createHealthRecordForUser(user) {
    try {
        const date = new Date();
        const healthRecordData = {
            recordId: await idGenerator("REC-"), // Generate unique health record ID
            patientId: user.patientId,
            userId: user.userId,
            date: date.toISOString().split('T')[0],
            waterIntake: { glassAmount: 0, glassCount: 0 },
            diet: {
                breakfast: { 
                    Iron: "",
                    Folate_VitaminB9: "",
                    VitaminB12: "",
                    VitaminC: "",
                    Zinc: "",
                    Magnesium: "",
                    Omega_3FattyAcids: "",
                    Protein: "",
                    Calcium_VitaminD: "",
                    Hydration_Fluids: ""
                },
                lunch: { 
                    Iron: "",
                    Folate_VitaminB9: "",
                    VitaminB12: "",
                    VitaminC: "",
                    Zinc: "",
                    Magnesium: "",
                    Omega_3FattyAcids: "",
                    Protein: "",
                    Calcium_VitaminD: "",
                    Hydration_Fluids: ""
                },
                dinner: {
                    Iron: "",
                    Folate_VitaminB9: "",
                    VitaminB12: "",
                    VitaminC: "",
                    Zinc: "",
                    Magnesium: "",
                    Omega_3FattyAcids: "",
                    Protein: "",
                    Calcium_VitaminD: "",
                    Hydration_Fluids: ""
                }
            },
            alcoholConsumption: { shotCount: 0 },
            sleep: { hours: 0, quality: "" },
            medicine: [],
            waterIntakePercentage: 0,
            dietPercentage: 0,
            alcoholPercentage: 0,
            sleepPercentage: 0,
            medicinePercentage: 0,
            notes: "",
            isDeleted: false
        };

        const healthRecord = await this.createHealthRecord(healthRecordData);
        console.log("Health Record Created:", healthRecord);
        return healthRecord;
    } catch (error) {
        console.error("Error creating health record:", error);
        throw new Error(`Failed to create health record: ${error.message}`);
    }
}

}

module.exports = new HealthRecordService();
