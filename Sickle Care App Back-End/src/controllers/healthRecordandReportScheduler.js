const cron = require("node-cron");
const healthRecordService = require('../services/healthRecordService');
const userService = require('../services/userServices');
const idGenerator = require("../utils/uniqueIdGenerator");
const medicineRecordController = require("./medicineRecordController");
const DailyReport = require("../models/dailyReport");

const createHealthRecordsAndGenerateReports = async () => {
    try {
        // Step 1: Fetch all patients
        const patients = await userService.getAllPatients();

        if (!patients.length) {
            console.log("No patients found. Skipping health record and report generation.");
            return;
        }

        // Step 2: Create health records
        const healthRecords = await Promise.all(
            patients.map(async ({ patientId, userId }) => {
                // Fetch medicines for each patient
                const medicineData = await medicineRecordController.getMedicinesForPatient(userId, patientId);

                return {
                    recordId: idGenerator("REC-"),
                    patientId,
                    userId,
                    date: new Date().toISOString().split("T")[0],
                    waterIntake: { glassAmount: 0, glassCount: 0 },
                    diet: {
                        breakfast: {
                            Iron: "",
                            Folate_VitaminB9: "",
                            VitaminB12: "",
                            VitaminC: "",
                            Zinc: "",
                            Magnesium: "",
                            Omega_3FattyAcids: "",
                            Protein: "",
                            Calcium_VitaminD: "",
                            Hydration_Fluids: ""
                        },
                        lunch: {
                            Iron: "",
                            Folate_VitaminB9: "",
                            VitaminB12: "",
                            VitaminC: "",
                            Zinc: "",
                            Magnesium: "",
                            Omega_3FattyAcids: "",
                            Protein: "",
                            Calcium_VitaminD: "",
                            Hydration_Fluids: ""
                        },
                        dinner: {
                            Iron: "",
                            Folate_VitaminB9: "",
                            VitaminB12: "",
                            VitaminC: "",
                            Zinc: "",
                            Magnesium: "",
                            Omega_3FattyAcids: "",
                            Protein: "",
                            Calcium_VitaminD: "",
                            Hydration_Fluids: ""
                        }
                    },
                    alcoholConsumption: { type: "", shotCount: 0, canCount: 0, name: "" },
                    sleep: { hours: 0, quality: "" },
                    medicine: medicineData,
                    waterIntakePercentage: 0,
                    dietPercentage: 0,
                    alcoholPercentage: 0,
                    sleepPercentage: 0,
                    medicinePercentage: 0,
                    notes: "",
                    isDeleted: false
                };
            })
        );

        await healthRecordService.createHealthRecords(healthRecords);
        console.log(`Created ${healthRecords.length} health records for today.`);

        // Step 3: Generate reports based on created health records
        const reports = healthRecords.map((record) => {
            const { recordId, userId, patientId, date } = record;

            return {
                reportId: idGenerator("REP-"),
                recordId,
                patientId,
                userId,
                date,
                waterIntake: {
                    taken: 0,
                    recommended: "3",
                    percentage: 0,
                    patientStatus: getStatus(0),
                    specialNote: "",
                },
                diet: {
                    eaten: [],
                    recommended: [],
                    percentage: 0,
                    patientStatus: getStatus(0),
                    specialNote: "",
                },
                sleep: {
                    slept: 0,
                    recommended: 7,
                    percentage: 0,
                    patientStatus: getStatus(0),
                    specialNote: "",
                },
                alcoholConsumption: {
                    shotsTaken: 0,
                    canTaken: 0,
                    recommended: { shots: 0, cans: 0 },
                    percentage: 0,
                    patientStatus: getStatus(0),
                    specialNote: "",
                },
                medicine: {
                    notTaken: [],
                    percentage: 0,
                    specialNote: "",
                },
                
            };
        });

        await DailyReport.insertMany(reports);
        console.log(`Generated ${reports.length} daily health reports with default values.`);
    } catch (error) {
        console.error("Error in health record and report generation:", error);
    }
};

// Schedule daily execution at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled task: Creating health records and generating reports...");
    await createHealthRecordsAndGenerateReports();
});

// Testing: Runs every minute
// cron.schedule("*/1 * * * *", async () => {
//     console.log("Running scheduled task: Creating health records and generating reports...");
//     await createHealthRecordsAndGenerateReports();
// });

module.exports = { createHealthRecordsAndGenerateReports };

// Helper function to determine health status
function getStatus(percentage) {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 50) return "Average";
    return "Poor";
}
