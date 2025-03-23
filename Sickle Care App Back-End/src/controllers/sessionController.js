const chatService = require('../services/chatService');
const sessionService = require('../services/sessionService');
const idGenerator = require('../utils/uniqueIdGenerator');
class SessionController {
    
    async createSession(req, res) {
        try {
            req.body.sessionId = await idGenerator("SESS-");
            req.body.isAccepted = "PENDING";
            const chat = await chatService.getChatByPatientIdAndDoctorId(req.body.patientId, req.body.doctorId);
            req.body.chatId = chat.chatId;
            const session = await sessionService.createSession(req.body);
            return res.status(200).json(session);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getSessionBySessionId(req, res) {
        try {
            const { sessionId } = req.params;
            const session = await sessionService.getSessionBySessionId(sessionId);
            return res.status(200).json(session);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getSessionsByChatIdAndPatientId(req, res) {
        try {
            const { chatId, patientId } = req.query;
            const sessions = await sessionService.getSessionsByChatIdAndPatientId(chatId,patientId);
            return res.status(200).json(sessions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getSessionsByChatIdAndDoctorId(req, res) {
        try {
            const {chatId, doctorId } = req.query;
            const sessions = await sessionService.getSessionsByChatIdAndDoctorId(chatId, doctorId);
            return res.status(200).json(sessions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getSessionsByChatId(req, res) {
        try {
            const { chatId } = req.query;
            const sessions = await sessionService.getSessionsByChatId(chatId);
            return res.status(200).json(sessions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getSessionsByDoctorId(req, res){
        try {
            const {doctorId} = req.query;
            const sessions = await sessionService.getSessionsByDoctorId(doctorId);
            return res.status(200).json(sessions);
        } catch (error) {
            return res.status(500).json({"error": error.message});
        }
    }
    async acceptSession(req, res) {
        try {
            const { sessionId } = req.query;
            const updatedSession = await sessionService.acceptSession(sessionId);
            return res.status(200).json(updatedSession);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async declineSession(req, res) {
        try {
            const { sessionId } = req.query;
            const updatedSession = await sessionService.declineSession(sessionId);
            return res.status(200).json(updatedSession);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SessionController();
