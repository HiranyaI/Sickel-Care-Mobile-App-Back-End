const DailyReport = require('../models/dailyReport');


class DailyReportService {
    async createDailyReport(reportData){
        try {
            const dailyReport = new DailyReport(reportData);
            return await dailyReport.save();
        } catch (error) {
            throw new Error(`error when creating daily report: ${error.message}`)
        }    
    }
    async updateWaterIntakeDailyReport(recordId, waterIntake){
        try {
            return await DailyReport.findOneAndUpdate(
                {recordId:recordId},
                {$set:{waterIntake: waterIntake}},
                {new:true}
            )
        } catch (error) {
            throw new Error(`error when updating water intake: ${error.message}`)
        }
    }
    async updateDietDailyReport(recordId, diet){
        try {
            return await DailyReport.findOneAndUpdate(
                {recordId:recordId},
                {$set:{diet: diet}},
                {new:true}
            )
        } catch (error) {
            throw new Error(`error when updating diet: ${error.message}`)
        }
    }
    async updateSleepDailyReport(recordId, sleep){
        try {
            return await DailyReport.findOneAndUpdate(
                {recordId:recordId},
                {$set:{sleep: sleep}},
                {new:true}
            )
        } catch (error) {
            throw new Error(`error when updating sleep: ${error.message}`)
        }
    }
    async updateAlcoholDailyReport(recordId, alcohol){
        try {
            return await DailyReport.findOneAndUpdate(
                {recordId:recordId},
                {$set:{alcoholConsumption: alcohol}},
                {new:true}
            )
        } catch (error) {
            throw new Error(`error when updating alcohol consumption: ${error.message}`)
        }
    }
    async updateMedicineDailyReport(recordId, medicine){
        try {
            return await DailyReport.findOneAndUpdate(
                {recordId:recordId},
                {$set:{medicine: medicine}},
                {new:true}
            )
        } catch (error) {
            throw new Error(`error when updating medicine: ${error.message}`)
        }
    }
    async updateDailyReport(reportId, updateData){
        try {
            return await DailyReport.findOneAndUpdate(
                {reportId},
                {$set:{updateData}},
                {new:true}
            );
        } catch (error) {
            throw new Error(`error when updating daily report: ${error.message}`);
        }
    }
    async getDailyReportByUserIdAndDate(userId, date){
        try {
            return await DailyReport.findOne({userId:userId, date:date});
        } catch (error) {
            throw new Error(`error when fetching daily report: ${error.message}`);
        }
    }
    async getReportsByPatientId(patientId){
        try {
            return await DailyReport.find(patientId);
        } catch (error) {
            throw new Error(`error when fetching report:${error.message}`);
        }
    }
    async getReportByRecordId(recordId){
        try {
            return await DailyReport.findOne({recordId:recordId});
        } catch (error) {
            throw new Error(`error when fetching report: ${error.message}`);
        }
    }

}
module.exports = new DailyReportService();