const Message = require('../models/message');

class MessageService{
    async createMessage(messageData){
        try {
            const message = new Message(messageData);
            return await message.save();
        } catch (error) {
            throw new Error(`error when creating message: ${error.message}`);
        }
    }
    async getMessagesPatientIdAndDoctorId(patientId, doctorId){
        try {
            return await Message.find(patientId, doctorId).sort({Timestamp: -1});
        } catch (error) {
            throw new Error(`error when fetching messages: ${error.message}`);
        }
    }
    async getMessageByMessageId(messageId){
        try{
            return await Message.findOne(messageId);
        } catch (error){
            throw new Error(`error when fetching message: ${error.message}`);
        }
    }
    
}