const express = require('express');
const dailyReportRouter = express.Router();
const dailyReportController = require('../controllers/dailyReportController');

dailyReportRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'daily report service' });
});

dailyReportRouter.post('/', dailyReportController.createDailyReport);

dailyReportRouter.put('/update', dailyReportController.updateDailyReport);

dailyReportRouter.get('/find/userId/date', dailyReportController.getReportByUserIdAndDate);
dailyReportRouter.get('/findall/patientId',dailyReportController.getReportsByPatientId);
dailyReportRouter.get('/find/recordId', dailyReportController.getReportByRecordId);

module.exports = dailyReportRouter;