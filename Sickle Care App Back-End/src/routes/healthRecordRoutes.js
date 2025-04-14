const express = require('express');
const healthRecordController = require('../controllers/healthRecordController');

const healthRecordRouter = express.Router();

healthRecordRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'health record service' });
});

healthRecordRouter.post('/', healthRecordController.createHealthRecord);

healthRecordRouter.get("/userId/date",healthRecordController.getHealthRecordByUserIdAndDate);
healthRecordRouter.get('/findall/patientId',healthRecordController.getHealthRecordsByPatientId);
healthRecordRouter.get('/findall/userId',healthRecordController.getHealthRecordByUserId);
healthRecordRouter.get('/recordId',healthRecordController.getHealthRecordByRecordId);
healthRecordRouter.get('/date',healthRecordController.getHealthRecordsByDate);

healthRecordRouter.patch('/patch/waterIntake',healthRecordController.updateWaterIntake);
healthRecordRouter.patch('/patch/diet',healthRecordController.updateDiet);
healthRecordRouter.patch('/patch/alcoholConsumption',healthRecordController.updateAlcoholConsumption);
healthRecordRouter.patch('/patch/sleep',healthRecordController.updateSleep);
healthRecordRouter.patch('/patch/medicine',healthRecordController.updateMedicine);
healthRecordRouter.patch('/patch/notes',healthRecordController.updateNotes);

healthRecordRouter.delete('/delete',healthRecordController.deleteHealthRecord);

module.exports = healthRecordRouter;

