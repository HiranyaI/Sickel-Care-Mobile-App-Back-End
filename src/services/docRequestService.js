const HealthRequest = require('../models/docRequest')
const User = require('../models/user')
class DoctorRequestService{
    async createDoctorRequest(requestData){
        try {
            const request = new HealthRequest(requestData);
            return await request.save();
        } catch (error) {
            throw new Error(`error creating doctor request: ${error.message}`)
        }
    }
    async getDoctorRequestsByDoctorId(doctorId){
        try {
            return await HealthRequest.find({doctorId:doctorId, isAccepted:"PENDING"});
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getDoctorRequestByRequestId(requestId){
        try {
            return await HealthRequest.findOne({requestId});
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getDoctorRequestsByPatientId(patientId){
        try {
            return await HealthRequest.find({patientId});
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`);
        }
    }
    async getAcceptedDoctorRequests(){
        try {
            return await HealthRequest.find({isAccepted:"ACCEPTED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getAcceptedDoctorRequestsByDoctorId(doctorId){
        try {
            return await HealthRequest.find({doctorId,isAccepted:"ACCEPTED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getAcceptedDoctorRequestsByDoctorId(patientId){
        try {
            return await HealthRequest.find({patientId,isAccepted:"ACCEPTED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getDeclinedDoctorRequest(){
        try {
            return await HealthRequest.find({isAccepted:"DECLINED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getDeclinedDoctorRequestByDoctorId(doctorId){
        try {
            return await HealthRequest.find({doctorId,isAccepted:"DECLINED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getDeclinedDoctorRequestByPatientId(patientId){
        try {
            return await HealthRequest.find({patientId,isAccepted:"DECLINED"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`)
        }
    }
    async getPedingDoctorRequest(){
        try {
            return await HealthRequest.find({isAccepted:"PENDING"})
        } catch (error) {
            throw new Error(`error when fetching data: ${error.message}`);
        }
    }
    async getAcceptedDoctorsIdsByPatientId(patientId) { 
        try {
            const requests = await HealthRequest.find(
                {patientId: patientId},
                { doctorId: 1, _id: 0 }
            );
            return requests.map(req => req.doctorId);
        } catch (error) {
            throw new Error(`Error when fetching data: ${error.message}`);
        }
    }

    async getPatientsByDoctorId(doctorId) {
        try {
            const patientIds = await HealthRequest.find(
                { doctorId: doctorId, isAccepted:"ACCEPTED"}, 
                { patientId: 1, _id: 0 }
            ).lean();

            const ids = patientIds.map(req => req.patientId);

            const patients = await User.find(
                { patientId: { $in: ids }}
            ).lean();

            return patients;
        } catch (error) {
            throw new Error(`Error fetching patients: ${error.message}`);
        }
    }
    
    async updateDoctorRequest(requestId,request){
        try {
            return await HealthRequest.findOneAndUpdate(
                {requestId},
                {$set: request},
                {new: true},
            );
        } catch (error) {
            throw new Error(`error when updating doctor request: ${error.message}`);
        }
    }
    async declineDoctorRequest(requestId){
        try {
            return await HealthRequest.findOneAndUpdate(
                {requestId},
                {$set:{isAccepted:"DECLINED"}},
                {new: true},
            )
        } catch (error) {
            throw new Error(`error when updating doctor request: ${error.message}`);
        }
    }
    async acceptDoctorRequest(requestId){
        try {
            return await HealthRequest.findOneAndUpdate(
                {requestId},
                {$set:{isAccepted:"ACCEPTED"}},
                {new: true},
            )
        } catch (error) {
            throw new Error(`error when updating doctor request: ${error.message}`);
        }
    }
    async deleteDoctorRequest(requestId){
        try {
            return await HealthRequest.findOneAndUpdate(
                {requestId},
                {$set:{isDeleted: true}},
                {new: true},
            )
        } catch (error) {
            throw new Error(`error when deleting doctor request: ${error.message}`);
        }
    }
}
module.exports = new DoctorRequestService();