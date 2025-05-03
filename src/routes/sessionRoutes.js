const express = require('express');
const sessionRouter = express.Router();
const sessionController = require('../controllers/sessionController');

sessionRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'session service' });
});

sessionRouter.post('/', sessionController.createSession);

sessionRouter.get('/sessionId', sessionController.getSessionBySessionId);

sessionRouter.get('/findall/chatId', sessionController.getSessionsByChatId);
sessionRouter.get('/findall/doctorId', sessionController.getSessionsByDoctorId)
sessionRouter.get('/findall/chatId/patientId', sessionController.getSessionsByChatIdAndPatientId);
sessionRouter.get('/findall/chatId/doctorId', sessionController.getSessionsByChatIdAndDoctorId);

sessionRouter.patch('/sessionId/accept', sessionController.acceptSession);
sessionRouter.patch('/sessionId/decline', sessionController.declineSession);

module.exports = sessionRouter;