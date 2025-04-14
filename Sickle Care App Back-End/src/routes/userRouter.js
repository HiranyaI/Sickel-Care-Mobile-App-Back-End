const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({ message: 'user route service' });
  });
router.post('/', userController.createUser);
router.post('/login',userController.login);

router.get('/findall', userController.getAllUsers);
router.get('/findall/patients',userController.getAllPatients);
router.get('/findall/doctors',userController.getAllDoctors);
router.get('/findall/admins',userController.getAllAdmins);
router.get('/findall/patients/sickleCellType', userController.getPatientsBySickleCellType);

router.get('/id', userController.getUserByUserId);
router.get('/patient/id',userController.getUserByPatientId);
router.get('/doctor/id',userController.getUserByDoctorId);
router.get('/admin/id',userController.getUserByAdminId);
router.get('/findall/available/doctors/patientId', userController.getUnAcceptedDoctors);

router.get('/count/users', userController.getUserCount);
router.get('/count/patients', userController.getPatientCount);
router.get('/count/patients/sickleCellType', userController.getPatientsCountBySickleCellType);
router.get('/count/doctors', userController.getDoctorCount);

router.put('/update/id', userController.updateUser);

router.delete('/delete/id', userController.deleteUser);

module.exports = router;