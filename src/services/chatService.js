const Chat = require('../models/chat');

class ChatService{
    async createChat(chatData){
        try {
            const chat = new Chat(chatData);
            return await chat.save();
        } catch (error) {
            throw new Error(`error when creating chat: ${error.message}`);
        }
    }
    async getChatsByPatientId(patientId){
        try {
            return await Chat.find({patientId:patientId});
        } catch (error) {
            throw new Error(`error when fetching chats: ${error.message}`);
        }
    }
    async getChatsByDoctorId(doctorId){
        try {
            return await Chat.find({doctorId: doctorId});
        } catch (error) {
            throw new Error(`error when fetching chats: ${error.message}`);
        }
    }
    async getChatByPatientIdAndDoctorId(patientId, doctorId){
        try {
            return await Chat.findOne({patientId: patientId, doctorId: doctorId});
        } catch (error) {
            throw new Error(`error when fetching chat: ${error.message}`);
        }
    }
    async getChatByChatId(chatId){
        try {
            return await Chat.findOne({chatId:chatId});
        } catch (error) {
            throw new Error(`error when fetching chat: ${error.message}`);
        }
    }
}

module.exports = new ChatService();