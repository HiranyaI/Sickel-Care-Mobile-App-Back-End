const chatService = require('../services/chatService');
const idGenerator = require('../utils/uniqueIdGenerator');

class ChatController{
    async getChatsByPatientId(req, res){
        try {
            const {patientId} = req.query;
            const chats = await chatService.getChatsByPatientId(patientId);
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async getChatsByDoctorId(req, res){
        try {
            const {doctorId} = req.query;
            const chats = await chatService.getChatsByDoctorId(doctorId);
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(500).json({"error": error.message});
        }
    }
    async getChatByChatId(req, res){
        try {
            const {chatId} = req.query;
            const chats = await chatService.getChatByChatId(chatId);
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
}

module.exports = new ChatController();