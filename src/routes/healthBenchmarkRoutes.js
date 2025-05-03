const express = require('express');
const healthBenchmarkController = require('../controllers/healthBenchmarkController');
const benchmark = express.Router();

benchmark.get('/', (req, res) => {
    res.status(200).json({ message: 'health benchmark service' });
});

benchmark.post("/", healthBenchmarkController.createHealthBenchmark);
benchmark.get("/find", healthBenchmarkController.getHealthBenchmark);

benchmark.put("/update/benchmarkId", healthBenchmarkController.updateHealthBenchmark);

module.exports = benchmark;