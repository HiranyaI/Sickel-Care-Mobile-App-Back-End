const express = require('express')
const medicineRecordController = require('../controllers/medicineRecordController');
const medicalRecordRouter = express.Router();

medicalRecordRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'medicine record service' });
});

medicalRecordRouter.post("/",medicineRecordController.createMedicine)

medicalRecordRouter.get("/patientId",medicineRecordController.getMedicineByPatientId)
medicalRecordRouter.get("/userId",medicineRecordController.getMedicineByUserId)

medicalRecordRouter.put("/update",medicineRecordController.updateMedicineRecord)

medicalRecordRouter.delete("/delete", medicineRecordController.deleteMedicineRecord)

module.exports = medicalRecordRouter;