const healthRecordService = require('../services/healthRecordService')
const HealthRecord = require('../models/healthRecord')
const idGenerator = require('../utils/uniqueIdGenerator')
const json = require('express');
const healthBenchmarkService = require('../services/healthBenchmarkService');
const medicineRecordService = require('../controllers/medicineRecordController');
const healthBenchmarkController = require('./healthBenchmarkController');
class HealthRecordController {
    constructor(){}
    async createHealthRecord(req, res) {
        try {
            req.body.isDeleted = false;
            const date = new Date();
            req.body.date = date.toISOString().split('T')[0];
            req.body.recordId = await idGenerator("REC-");

            const medicineData = await medicineRecordService.getMedicinesForPatient(req.body.userId, req.body.patientId);
            if (!req.body.recordId){
                return res.status(500).json({"error":"failed to generate record id"})
            }
            req.body.medicine = medicineData;
            console.log(req.body)
            const healthRecord = await healthRecordService.createHealthRecord(req.body);
            return res.status(200).json(healthRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getHealthRecordsByPatientId(req, res) {
        try {
            const { patientId } = req.query;
            const records = await healthRecordService.getHealthRecordsByPatientId(patientId);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getHealthRecordByRecordId(req, res) {
        try {
            const { recordId } = req.query;
            const record = await healthRecordService.getHealthRecordByRecordId(recordId);
            if (!record) {
                return res.status(404).json({ error: "Health record not found" });
            }
            return res.status(200).json(record);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getHealthRecordByUserId(req, res) {
        try {
            const { userId } = req.query;
            const record = await healthRecordService.getHealthRecordsByUserId(userId);
            if (!record) {
                return res.status(404).json({ error: "Health record not found" });
            }
            return res.status(200).json(record);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async getHealthRecordsByDate(req, res) {
        try {
            const { date } = req.query;
            const records = await healthRecordService.getHealthRecordsByDate(date);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getHealthRecordByUserIdAndDate(req, res) {
        try {
            const { userId, date } = req.query;
            const records = await healthRecordService.getHealthRecordByUserIdAndDate(userId, date);
            return res.status(200).json(records);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    async updateWaterIntake(req, res) {
        try {
            const { recordId } = req.query;
            await healthRecordService.updateWaterIntake(recordId, req.body);
            const {waterIntakePercentage, waterIntakeRecord} = await healthBenchmarkController.benchmarkWaterIntake(recordId, req.body);
            return res.status(200).json(waterIntakeRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateDiet(req, res) {
        try {
            const { recordId } = req.query;
            const updatedRecord = await healthRecordService.updateDiet(recordId, req.body);
            const  {dietPercentage, dietRecord, eatenNutrients} = await healthBenchmarkController.benchmarkDiet(recordId, req.body);
            return res.status(200).json(dietRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateAlcoholConsumption(req, res) {
        try {
            const { recordId } = req.query;
            const updatedRecord = await healthRecordService.updateAlcoholConsumption(recordId, req.body);
            const {alcoholPercentage, alcoholRecord} = await healthBenchmarkController.benchmarkAlcoholConsumption(recordId, req.body);
            return res.status(200).json(alcoholRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateSleep(req, res) {
        try {
            const { recordId } = req.query;
            const updatedRecord = await healthRecordService.updateSleep(recordId, req.body);
            const {sleepPercentage, sleepRecord}  = await healthBenchmarkController.benchmarkSleep(recordId, req.body);
            return res.status(200).json(sleepRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateMedicine(req, res) {
        try {
            const { recordId } = req.query;
            const updatedRecord = await healthRecordService.updateMedicine(recordId, req.body);
            const {medicinePercentage, medicineRecord, notTakenMedicines} = await healthBenchmarkController.benchmarkMedicine(recordId, req.body);
            return res.status(200).json(medicineRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateNotes(req, res) {
        try {
            const { recordId } = req.query;
            const updatedRecord = await healthRecordService.updateNotes(recordId, req.body);
            return res.status(200).json(updatedRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteHealthRecord(req, res) {
        try {
            const { recordId } = req.query;
            const deletedRecord = await healthRecordService.softDeleteHealthRecord(recordId);
            return res.status(200).json(deletedRecord);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    
}

module.exports = new HealthRecordController();
