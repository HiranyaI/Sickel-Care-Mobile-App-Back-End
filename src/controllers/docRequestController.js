const DoctorRequest = require('../models/docRequest');
const idGenerator = require('../utils/uniqueIdGenerator');
const docRequestService = require('../services/docRequestService');
const chatService = require('../services/chatService');
const userServices = require('../services/userServices');

class DoctorRequestService{
    async createDoctorRequest(req, res){
        try {
            req.body.isAccepted = "PENDING";
            req.body.requestId = await idGenerator("REQ-");
            req.body.date = Date.now();
            if(!req.body.requestId){
                return res.status(500).json({"error":"failed to generate the requestId"})
            }
            const healthRecord = await docRequestService.createDoctorRequest(req.body);
            return res.status(200).json(healthRecord)
        } catch (error) {
            return res.status(500).json({"error": error.message})
        }
    }
    async getDoctorRequestsByDoctorId(req, res){
        try {
            const {doctorId} = req.query;
            const doctorRequest = await docRequestService.getDoctorRequestsByDoctorId(doctorId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getDoctorRequestsByPatientId(req, res){
        try {
            const {patientId} = req.query;
            const doctorRequest = await docRequestService.getDoctorRequestsByPatientId(patientId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getDoctorRequestByRequestId(req, res){
        try {
            const {requestId} = req.query;
            const doctorRequest = await docRequestService.getDoctorRequestByRequestId(requestId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getAcceptedDoctorRequests(req, res){
        try {
            const doctorRequest = await docRequestService.getAcceptedDoctorRequests();
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getAcceptedDoctorRequestsByDoctorId(req, res){
        try {
            const {doctorId} = req.doctorId
            const doctorRequest = await docRequestService.getAcceptedDoctorRequestsByDoctorId(doctorId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getAcceptedDoctorRequestsByPatientId(req, res){
        try {
            const {patientId} = req.query;
            const doctorRequest = await docRequestService.getAcceptedDoctorRequestsByPatientId(patientId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getDeclinedDoctorRequests(req, res){
        try {
            const doctorRequest = await docRequestService.getDeclinedDoctorRequest();
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getDeclinedDoctorRequestsByDoctorId(req, res){
        try {
            const {doctorId} = req.query;
            const doctorRequest = await docRequestService.getDeclinedDoctorRequestByDoctorId(doctorId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getDeclinedDoctorRequestsByPatientId(req, res){
        try {
            const {patientId} = req.query;
            const doctorRequest = await docRequestService.getDeclinedDoctorRequestByPatientId(patientId);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getPendingDoctorRequests(req, res){
        try {
            const doctorRequest = await docRequestService.getPedingDoctorRequest();
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message})
        }
    }
    async getRequestedPatientsByDoctorId(req, res){
        try {
            const {doctorId} = req.query;
            const patients = await docRequestService.getPatientsByDoctorId(doctorId);
            return res.status(200).json(patients);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async updateDoctorRequest(req, res){
        try {
            const {requestId} = req.query;
            const doctorRequest = await docRequestService.updateDoctorRequest(requestId,req.body);
            return res.status(200).json(doctorRequest);
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async acceptDoctorRequest(req, res){
        try {
            const {requestId} = req.query;
            const doctorRequest = await docRequestService.acceptDoctorRequest(requestId);
            const patient = await userServices.getUserByPatientId(doctorRequest.patientId);
            const doctor = await userServices.getUserByDoctorId(doctorRequest.doctorId);
            const chatStruct = {
                chatId:await idGenerator("CHAT-"),
                requestId:doctorRequest.requestId,
                patientId:doctorRequest.patientId,
                doctorId:doctorRequest.doctorId,
                patientName: (patient.firstName + " "+patient.lastName),
                doctorName: (doctor.firstName + " "+doctor.lastName)
            }
            const chat = await chatService.createChat(chatStruct);
            return res.status(200).json({"error":"request accepted"})
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async declineDoctorRequest(req, res){
        try {
            const {requestId} = req.query;
            const doctorRequest = await docRequestService.declineDoctorRequest(requestId);
            return res.status(200).json({"error":"request declined"})
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
    async deleteDoctorRequest(req, res){
        try {
            const {requestId} = req.query;
            const doctorRequest = await docRequestService.deleteDoctorRequest(requestId);
            return res.status(200).json()
        } catch (error) {
            return res.status(500).json({"error":error.message});
        }
    }
}
module.exports = new DoctorRequestService();