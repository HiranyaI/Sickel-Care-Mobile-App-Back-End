require('dotenv').config();

const express = require('express');
const { ConnectToMongo } = require('./src/config/db');

const userRouter = require('./src/routes/userRouter');
const healthRecordRouter = require('./src/routes/healthRecordRoutes');
const medicineRecordRouter = require('./src/routes/medicineRecordRoutes');
const doctorRequestRouter = require('./src/routes/docRequestRoutes');
const dailyReportRouter = require('./src/routes/dailyReportRoutes');
const healthBenchmarkRouter = require('./src/routes/healthBenchmarkRoutes');
const healthReportRouter = require('./src/routes/dailyReportRoutes')
const healthRecordandReportCronJob = require('./src/controllers/healthRecordandReportScheduler')
const blogRouter = require('./src/routes/blogRoutes');

const logger = require('./src/middleware/logger');
const chatRoutes = require('./src/routes/chatRoutes');
const sessionRouter = require('./src/routes/sessionRoutes');


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(logger);

// Connect to MongoDB
ConnectToMongo();

//cron jobs
//healthRecordandReportCronJob.createHealthRecordsAndGenerateReports();

// Use user routes
app.use('/sicklecare-be/api/user', userRouter);
app.use('/sicklecare-be/api/healthRecord', healthRecordRouter);
app.use('/sicklecare-be/api/medicineRecord', medicineRecordRouter)
app.use('/sicklecare-be/api/doctorRequest', doctorRequestRouter);
app.use('/sicklecare-be/api/dailyReport', dailyReportRouter);
app.use('/sicklecare-be/api/benchmark', healthBenchmarkRouter);
app.use('/sicklecare-be/api/dailyReport', healthReportRouter);
app.use('/sicklecare-be/api/blog',blogRouter);
app.use('/sicklecare-be/api/chat', chatRoutes);
app.use('/sicklecare-be/api/session', sessionRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});