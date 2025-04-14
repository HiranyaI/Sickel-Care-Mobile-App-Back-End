const express = require('express');
const doctorRequestController = require('../controllers/docRequestController');
const doctorRequestRouter = express.Router();

doctorRequestRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'doctor request service' });
});

doctorRequestRouter.post('/',doctorRequestController.createDoctorRequest);

doctorRequestRouter.patch('/accept', doctorRequestController.acceptDoctorRequest);
doctorRequestRouter.patch('/decline',doctorRequestController.declineDoctorRequest);

doctorRequestRouter.get('/requestId', doctorRequestController.getDoctorRequestByRequestId);
doctorRequestRouter.get('/findall/doctorId', doctorRequestController.getDoctorRequestsByDoctorId);
doctorRequestRouter.get('/findall/patientId', doctorRequestController.getDoctorRequestsByPatientId);
doctorRequestRouter.get('/findall/declined', doctorRequestController.getDeclinedDoctorRequests);
doctorRequestRouter.get('/findall/accepted', doctorRequestController.getDeclinedDoctorRequests);
doctorRequestRouter.get('/findall/accepted/doctorId', doctorRequestController.getAcceptedDoctorRequestsByDoctorId);
doctorRequestRouter.get('/findall/declined/doctorId',doctorRequestController.getDeclinedDoctorRequestsByDoctorId);
doctorRequestRouter.get('/findall/accepted/patientId', doctorRequestController.getAcceptedDoctorRequestsByPatientId);
doctorRequestRouter.get('/findall/declined/patientId',doctorRequestController.getDeclinedDoctorRequestsByPatientId);
doctorRequestRouter.get('/findall/patients/doctorId',doctorRequestController.getRequestedPatientsByDoctorId);
doctorRequestRouter.put('/update',doctorRequestController.updateDoctorRequest);
doctorRequestRouter.delete('/delete',doctorRequestController.deleteDoctorRequest);

module.exports = doctorRequestRouter;