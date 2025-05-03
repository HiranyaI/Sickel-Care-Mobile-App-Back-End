const medicineService = require('../services/medicineRecordService');
const Medicine = require('../models/medicineRecords');
const idGenerator = require('../utils/uniqueIdGenerator');
const healthRecordService = require('../services/healthRecordService');

class MedicineController {
    async createMedicine(req, res) {
        try {
            req.body.isDeleted = false;
            req.body.medicineId = await idGenerator("MED-");
            if (!req.body.medicineId) {
                return res.status(400).json({ error: "Failed to generate medicine ID" });
            }
            const medicine = await medicineService.createMedicine(req.body);
            
            // Transform medicine structure to match healthRecord schema
            const transformedMedicine = {
                morning: medicine.medicines.morning.map(name => ({ name, isTaken: false })),
                day: medicine.medicines.day.map(name => ({ name, isTaken: false })),
                night: medicine.medicines.night.map(name => ({ name, isTaken: false })),
            };
            const updatedRecord = await healthRecordService.updateLatestMedicineRecord(medicine.patientId, transformedMedicine)
            console.log(updatedRecord)
            console.log(transformedMedicine)
            return res.status(200).json(medicine);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    

    async getMedicineByPatientId(req, res) {
        try {
            const { patientId, userId } = req.query;
            const medicines = await medicineService.getMedicineByPatientId(patientId, userId);
            return res.status(200).json(medicines);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getMedicineByUserId(req, res) {
        try {
            const { userId } = req.query;
            const medicine = await medicineService.getMedicinesByUserId(userId);
            return res.status(200).json(medicine);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateMedicineRecord(req, res) {
        try {
            const { medicineId } = req.query;
            const updatedMedicine = await medicineService.updateMedicineRecord(medicineId, req.body.schedule);
            return res.status(200).json(updatedMedicine);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicineRecord(req, res) {
        try {
            const { medicineId } = req.query;
            const deletedMedicine = await medicineService.softDeleteMedicine(medicineId);
            return res.status(200).json(deletedMedicine);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getMedicinesForPatient(userId, patientId) {
        try {
            const medicines = await medicineService.getMedicineByPatientId(patientId, userId);
            if (!medicines) return { morning: [], day: [], night: [] };
    
            return {
                morning: medicines.medicines.morning.map(name => ({ name, isTaken: false })),
                day: medicines.medicines.day.map(name => ({ name, isTaken: false })),
                night: medicines.medicines.night.map(name => ({ name, isTaken: false }))
            };
        } catch (error) {
            console.error("Error fetching medicines:", error);
            throw new Error("Failed to fetch medicines.");
        }
    }
    
}

module.exports = new MedicineController();
