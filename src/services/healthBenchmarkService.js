const HealthBenchmark = require('../models/benchmark');

class HealthBenchmarkService{
    async createHealthBenchmark(benchmark){
        try {
            const benchmarkData = new HealthBenchmark(benchmark)
            return await benchmarkData.save();
        } catch (error) {
            throw new Error(`error when creating benchmark data: ${error.message}`);
        }
    }
    async getHealthBenchmark(){
        try {
            return await HealthBenchmark.findOne();
        } catch (error) {
            throw new Error(`error when fetching benchmark data: ${error.message}`);
        }
    }
    async updateHealthBenchmark(benchmarkId, benchmark){
        try {
            return await HealthBenchmark.findOneAndUpdate(
                {benchmarkId: benchmarkId},
                {$set: benchmark},
                {new: true}
            );
        } catch (error) {
            throw new Error(`error when updating benchmark data: ${error.message}`);
        }
    }
}
module.exports = new HealthBenchmarkService();