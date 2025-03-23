const dailyReportService = require('../services/dailyReportService');
const idGenerator = require('../utils/uniqueIdGenerator');
const DailyReport = require('../models/dailyReport');
const healthRecordService = require('../services/healthRecordService');
const healthBenchmarkController = require('./healthBenchmarkController');
const healthBenchmarkService = require('../services/healthBenchmarkService');

class DailyReportController{
    async createDailyReport(req, res){
        try {
            const {patientId, date} = req.query;
            const healthRecord = await healthRecordService.getHealthRecordByPatientIdandDate(patientId, date);
            const benchmark = await healthBenchmarkService.getHealthBenchmark();

            console.log(healthRecord);
            const {waterIntakePercentage, waterIntakeRecord} = await healthBenchmarkController.benchmarkWaterIntake(healthRecord.recordId, healthRecord.waterIntake);
            console.log(waterIntakePercentage);

            const {dietPercentage, dietRecord, eatenNutrients} = await healthBenchmarkController.benchmarkDiet(healthRecord.recordId,healthRecord.diet);
            console.log(dietPercentage);

            const {alcoholPercentage, alcoholRecord} = await healthBenchmarkController.benchmarkAlcoholConsumption(healthRecord.recordId, healthRecord.alcoholConsumption);
            console.log(alcoholPercentage);

            const {sleepPercentage, sleepRecord} = await healthBenchmarkController.benchmarkSleep(healthRecord.recordId, healthRecord.sleep);
            console.log(sleepPercentage);

            const {medicinePercentage, medicineRecord, notTakenMedicines} = await healthBenchmarkController.benchmarkMedicine(healthRecord.recordId, healthRecord.medicine);
            console.log(medicinePercentage);
            
            const healthReport = {
                reportId: await idGenerator("REP-"),
                recordId: healthRecord.recordId,
                userId: healthRecord.userId,
                patientId: healthRecord.patientId,
                date: healthRecord.date,
                report:{
                    waterIntake:{
                        taken: (healthRecord.waterIntake.glassAmount * healthRecord.waterIntake.glassCount),
                        recommended: (benchmark.waterIntake.litres),
                        percentage: waterIntakePercentage,
                        patientStatus: healthBenchmarkController.getStatus(waterIntakePercentage),
                        specialNotes:""
                    },
                    diet:{
                        eaten: eatenNutrients,
                        recommended: benchmark.diet,
                        percentage: dietPercentage,
                        patientStatus: healthBenchmarkController.getStatus(dietPercentage),
                        specialNotes:""
                    },
                    sleep:{
                        slept: healthRecord.sleep.hours,
                        recommended: benchmark.sleep,
                        percentage: sleepPercentage,
                        patientStatus: healthBenchmarkController.getStatus(sleepPercentage),
                        specialNote:healthRecord.sleep.quality
                    },
                    alcoholConsumption:{
                        shotsTaken: healthRecord.alcoholConsumption.shotCount,
                        canTaken: healthRecord.alcoholConsumption.canCount,
                        recommended:{
                            shots: healthRecord.alcoholConsumption.shotCount,
                            cans: healthRecord.alcoholConsumption.canCount,
                        },
                        percentage: alcoholPercentage,
                        patientStatus: healthBenchmarkController.getStatus(alcoholPercentage),
                        specialNotes:""
                    },
                    medicine:{
                        notTaken:notTakenMedicines,
                        percentage: medicinePercentage,
                        specialNote:""
                    }
                },
                
            }
            
        } catch (error) {
            return res.status(500).json({"error":"benchmark details"})
        }
    }
    async updateDailyReport(req,res){
        try {
            const {reportId} = req.query;
            const dailyReport = await dailyReportService.updateDailyReport(reportId, req.body);
            return res.status(200).json(dailyReport)
        } catch (error) {
            return res.status(200).json({'error':"error when updating daily report"})
        }
    }
    async getReportByUserIdAndDate(req, res) {
        try {
            const { userId, date } = req.query;
            let dailyReport = await dailyReportService.getDailyReportByUserIdAndDate(userId, date);
            if (!dailyReport) {
                dailyReport = {
                    reportId: "",
                    recordId: "",
                    userId,
                    patientId: "",
                    date,
                    waterIntake: {
                        taken: 0,
                        recommended: "0",
                        percentage: 0
                    },
                    diet: {
                        eaten: [],
                        recommended: [],
                        percentage: 0
                    },
                    sleep: {
                        slept: 0,
                        recommended: 0,
                        percentage: 0
                    },
                    alcoholConsumption: {
                        shotsTaken: 0,
                        recommended: {
                            shots: 0
                        },
                        percentage: 0
                    },
                    medicine: {
                        notTaken: [],
                        percentage: 0
                    }
                };
            }
    
            return res.status(200).json(dailyReport);
        } catch (error) {
            return res.status(500).json({ error: "Error when retrieving data" });
        }
    }
    
    async getReportsByPatientId(req, res){
        try {
            const {patientId} = req.query;
            const dailyReports = await dailyReportService.getReportsByPatientId(patientId);
            return res.status(200).json(dailyReports);
        } catch (error) {
            return res.status(500).json({'error':'error when retrieving data'});
        }
    }
    async getReportByRecordId(req, res){
        try {
            const {recordId} = req.query;
            const dailyReport = await dailyReportService.getReportByRecordId(recordId);
            return res.status(200).json(dailyReport);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = new DailyReportController();