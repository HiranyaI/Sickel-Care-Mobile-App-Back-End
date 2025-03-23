const { model } = require('mongoose');
const healthBenchmarkService = require('../services/healthBenchmarkService');
const healthRecordService = require('../services/healthRecordService');
const idGenerator = require('../utils/uniqueIdGenerator');
const dailyReportService = require('../services/dailyReportService');

class HealthBenchmarkController{
    async createHealthBenchmark(req, res){
        try {
            req.body.benchmarkId = await idGenerator("BENCH-");
            const benchmark = await healthBenchmarkService.createHealthBenchmark(req.body)
            res.status(200).json(benchmark);
        } catch (error) {
            res.status(500).json({'error':error.message});
        }
    }
    async updateHealthBenchmark(req, res){
        try {
            const {benchmarkId} = req.query;
            const benchmark = await healthBenchmarkService.updateHealthBenchmark(benchmarkId, req.body);
            res.status(200).json(benchmark);
        } catch (error) {
            res.status(500).json({"error":error.message});
        }
    }
    async getHealthBenchmark(req, res){
        try {
            const benchmark = await healthBenchmarkService.getHealthBenchmark();
            res.status(200).json(benchmark);
        } catch (error) {
            res.status(500).json({"error":error.message});
        }
        
    }
    async benchmarkWaterIntake(recordId, waterIntake){
        try {
            const benchmark = await healthBenchmarkService.getHealthBenchmark();
            let waterIntakePercentage = ((waterIntake.glassCount * waterIntake.glassAmount)/benchmark.waterIntake.litres)*100;
            if (waterIntakePercentage >= 100){
                waterIntakePercentage = 100;
            }
            console.log(waterIntakePercentage)
            const waterIntakeReportStruct = {
                taken: (waterIntake.glassCount * waterIntake.glassAmount),
                recommended: benchmark.waterIntake.litres,
                percentage:waterIntakePercentage,
                patientStatus: this.getStatus(waterIntakePercentage)
            }
            const waterIntakeRecord = await healthRecordService.benchmarkWaterIntake(recordId, waterIntakePercentage);
            const waterIntakeReport = await dailyReportService.updateWaterIntakeDailyReport(recordId, waterIntakeReportStruct)
            console.log("percentage - controller layer ", waterIntakePercentage);
            console.log("record - controller layer ", waterIntakeRecord);

            console.log(waterIntakePercentage)
            return {waterIntakePercentage,waterIntakeRecord}
        } catch (error) {
            return {percentage:0,record:null}
        }
    }
    async benchmarkAlcoholConsumption(recordId, alcoholConsumption) {
        try {
            const benchmark = await healthBenchmarkService.getHealthBenchmark();
            const MAX_SHOTS = benchmark.alcoholConsumption.maxShots; 
            const alPercentage = ((alcoholConsumption.shotCount / MAX_SHOTS)) *100;
            const alcoholPercentage = Math.min(alPercentage, 100);
            const alcoholConsumptionReportStruct = {
                shotsTaken: alcoholConsumption.shotCount,
                recommended:{
                    shots: benchmark.alcoholConsumption.maxShots
                },
                percentage: alPercentage,
                patientStatus: this.getStatus(alcoholPercentage)
            }
            const alcoholRecord = await healthRecordService.benchmarkAlcoholConsumption(recordId, alcoholPercentage);
            const alcohoclReport = await dailyReportService.updateAlcoholDailyReport(recordId, alcoholConsumptionReportStruct);
            return {alcoholPercentage, alcoholRecord};
        } catch (error) {
            return {alcoholPercentage:0, alcoholRecord:null};
        }
    }
    async benchmarkDiet(recordId, diet) {
        try {
            const benchmark = await healthBenchmarkService.getHealthBenchmark(); // Unused yet
            const nutrientsToCheck = [
                "Folate_VitaminB9", "VitaminB12", "VitaminC", 
                "Zinc", "Omega_3FattyAcids", "Magnesium", 
                "Protein", "Calcium_VitaminD"
            ];
            const meals = ['breakfast', 'lunch', 'dinner'];
            let totalNutritionPercentage = 0;
            let eatenNutrients = []; // Collect eaten nutrients
            for (const meal of meals) {
                const mealData = diet[meal];
                if (!mealData) continue; // Skip if meal data is missing
                let nutrientCount = 0;
                for (const nutrient of nutrientsToCheck) {
                    const foodInMeal = mealData[nutrient]; // Expecting food names or array
                    if (foodInMeal && foodInMeal.length > 0) {  
                        nutrientCount++;  // Count nutrients with actual food sources
                        eatenNutrients.push(nutrient); // Store eaten nutrients
                    }
                }
                let mealPercentage = (nutrientCount / nutrientsToCheck.length) * 100;
                totalNutritionPercentage += mealPercentage;
            }
            
            const dietPercentage = Math.min(totalNutritionPercentage / 3, 100);
            const dietReportStruct = {
                eaten: eatenNutrients,
                recommended: nutrientsToCheck,
                percentage: dietPercentage,
                patientStatus: this.getStatus(dietPercentage)
            }
            const dietReport = await dailyReportService.updateDietDailyReport(recordId, dietReportStruct);
            const dietRecord = await healthRecordService.benchmarkDiet(recordId, dietPercentage);
    
            return { dietPercentage, dietRecord, eatenNutrients };
        } catch (error) {
            console.error("Error benchmarking nutrition:", error.message);
            return { dietPercentage: 0, dietRecord: null, eatenNutrients: [] };
        }
    }
    
    async benchmarkMedicine(recordId, medicine) {
        try {
            const periods = ["morning", "day", "night"];
            let totalAdherence = 0;
            let periodCount = 0;
            let notTakenMedicines = []; // Collect not taken medicines
    
            for (const period of periods) {
                const medicines = medicine[period];
                if (!medicines || medicines.length === 0) continue;
    
                const totalMeds = medicines.length;
                const takenMeds = medicines.filter(med => med.isTaken).length;
    
                // Collect medicines that were not taken
                const missedMeds = medicines
                    .filter(med => !med.isTaken)
                    .map(med => (med.name)); // Include medicine name and period
    
                notTakenMedicines.push(...missedMeds);
    
                const adherencePercentage = (takenMeds / totalMeds) * 100;
                totalAdherence += adherencePercentage;
                periodCount++;
            }
    
            const medicinePercentage = periodCount > 0 ? totalAdherence / periodCount : 0;
            const medicineReportStruct = {
                notTaken: notTakenMedicines,
                percentage: medicinePercentage,

            }
            const medicineRecord = await healthRecordService.benchmarkMedicine(recordId, medicinePercentage);
            const medicineReport = await dailyReportService.updateMedicineDailyReport(recordId, medicineReportStruct);
            return { medicinePercentage, medicineRecord, notTakenMedicines };
        } catch (error) {
            console.error("Error benchmarking medicine adherence:", error.message);
            return { medicinePercentage: 0, medicineRecord: null, notTakenMedicines: [] };
        }
    }
    async benchmarkSleep(recordId, sleep) {
        try {
            const benchmark = await healthBenchmarkService.getHealthBenchmark();
            const RECOMMENDED_SLEEP_HOURS = benchmark.sleep;
            const sleptPercentage = (sleep.hours / RECOMMENDED_SLEEP_HOURS) * 100;
            const sleepPercentage = Math.min(sleptPercentage, 100);
            const sleepReportStruct = {
                slept:sleep.hours,
                recommended: benchmark.sleep,
                percentage: sleepPercentage,
                patientStatus: this.getStatus(sleepPercentage)
            }
            const sleepRecord = await healthRecordService.benchmarkSleep(recordId, sleepPercentage);
            const sleepReport = await dailyReportService.updateSleepDailyReport(recordId, sleepReportStruct);
            return {sleepPercentage, sleepRecord};
        } catch (error) {
            console.error("Error benchmarking sleep:", error.message);
            return {sleepPercentage:0, sleepRecord:null};
        }
    }
    
    getStatus(percentage) {
        if (percentage >= 90) return "Excellent";
        if (percentage >= 75) return "Good";
        if (percentage >= 50) return "Average";
        return "Poor";
    }
    
    
    
}
module.exports = new HealthBenchmarkController();