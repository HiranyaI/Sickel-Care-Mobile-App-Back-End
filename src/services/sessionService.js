const Session = require('../models/session');

class SessionService {

    async createSession(sessionData) {
        try {
            const session = new Session(sessionData);
            return await session.save();
        } catch (error) {
            throw new Error(`Error creating session: ${error.message}`);
        }
    }
    async getSessionBySessionId(sessionId) {
        try {
            return await Session.findOne({ sessionId });
        } catch (error) {
            throw new Error(`Error fetching session: ${error.message}`);
        }
    }
    async getSessionsByChatIdAndPatientId(chatId, patientId) {
        try {
            return await Session.find({chatId:chatId, patientId: patientId });
        } catch (error) {
            throw new Error(`Error fetching sessions: ${error.message}`);
        }
    }
    async getSessionsByChatIdAndDoctorId(chatId, doctorId) {
        try {
            return await Session.find({chatId: chatId, doctorId: doctorId });
        } catch (error) {
            throw new Error(`Error fetching sessions: ${error.message}`);
        }
    }
    async getSessionsByDoctorId(doctorId) {
        try {
            return await Session.find({doctorId: doctorId});
        } catch (error) {
            throw new Error(`Error fetching sessions: ${error.message}`);
        }
    }
    async getSessionsByChatId(chatId) {
        try {
            return await Session.find({ chatId });
        } catch (error) {
            throw new Error(`Error fetching sessions by chatId: ${error.message}`);
        }
    }
    async acceptSession(sessionId) {
        try {
            return await Session.findOneAndUpdate(
                { sessionId },
                { $set: { isAccepted: "ACCEPT" } },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error accepting session: ${error.message}`);
        }
    }
    async declineSession(sessionId) {
        try {
            return await Session.findOneAndUpdate(
                { sessionId },
                { $set: { isAccepted: "DECLINE" } },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error accepting session: ${error.message}`);
        }
    }
}

module.exports = new SessionService();
