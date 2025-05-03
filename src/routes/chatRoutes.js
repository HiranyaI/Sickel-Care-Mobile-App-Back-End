const express = require('express');
const chatRoutes = express.Router();

const chatController = require('../controllers/chatController');
const chat = require('../models/chat');

chatRoutes.get('/', (req, res) => {
    res.status(200).json({ message: 'chats service' });
});

chatRoutes.get('/chatId', chatController.getChatByChatId);

chatRoutes.get('/findall/patientId', chatController.getChatsByPatientId);
chatRoutes.get('/findall/doctorId', chatController.getChatsByDoctorId);

module.exports = chatRoutes;