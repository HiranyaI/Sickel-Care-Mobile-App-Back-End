const { expect } = require('chai');
const sinon = require('sinon');
const healthBenchmarkController = require('../src/controllers/healthBenchmarkController');

const healthBenchmarkService = require('../src/services/healthBenchmarkService');
const healthRecordService = require('../src/services/healthRecordService');
const dailyReportService = require('../src/services/dailyReportService');

describe('HealthBenchmarkController - benchmarkWaterIntake', () => {
  let getHealthBenchmarkStub;
  let benchmarkWaterIntakeStub;
  let updateWaterIntakeDailyReportStub;

  beforeEach(() => {
    getHealthBenchmarkStub = sinon.stub(healthBenchmarkService, 'getHealthBenchmark');
    benchmarkWaterIntakeStub = sinon.stub(healthRecordService, 'benchmarkWaterIntake');
    updateWaterIntakeDailyReportStub = sinon.stub(dailyReportService, 'updateWaterIntakeDailyReport');
  });

  afterEach(() => {
    sinon.restore(); // Restore all stubs
  });

  it('should calculate water intake percentage and update reports', async () => {
    const mockBenchmark = { waterIntake: { litres: 3000 } };
    const recordId = 'REC123';
    const waterIntake = { glassCount: 4, glassAmount: 500 }; // 2000 ml

    getHealthBenchmarkStub.resolves(mockBenchmark);
    benchmarkWaterIntakeStub.resolves({ updated: true });
    updateWaterIntakeDailyReportStub.resolves({ updated: true });

    const result = await healthBenchmarkController.benchmarkWaterIntake(recordId, waterIntake);

    expect(result.waterIntakePercentage).to.be.closeTo(66.66, 0.1);
    expect(result.waterIntakeRecord).to.deep.equal({ updated: true });

    sinon.assert.calledOnce(getHealthBenchmarkStub);
    sinon.assert.calledWith(benchmarkWaterIntakeStub, recordId, sinon.match.number);
    sinon.assert.calledOnce(updateWaterIntakeDailyReportStub);
  });

  it('should return default values when an error occurs', async () => {
    getHealthBenchmarkStub.rejects(new Error('Service down'));

    const result = await healthBenchmarkController.benchmarkWaterIntake('REC456', {
      glassCount: 2,
      glassAmount: 250
    });

    expect(result).to.deep.equal({ percentage: 0, record: null });
  });
});
