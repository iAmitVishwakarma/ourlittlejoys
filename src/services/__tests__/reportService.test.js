import { describe, it, expect } from 'vitest';
import { reportService } from '../reportService';

describe('reportService', () => {
  it('fetches batch report by batchNumber in mock mode', async () => {
    const report = await reportService.getBatchReport('SL-2026-NM09');
    expect(report).toBeDefined();
    expect(report.batchNumber).toBe('SL-2026-NM09');
    expect(report.proteinAnalysis).toBeDefined();
    expect(report.heavyMetals).toBeDefined();
  });

  it('falls back to default report when batch number is not found', async () => {
    const report = await reportService.getBatchReport('UNKNOWN-BATCH-999');
    expect(report).toBeDefined();
    expect(report.batchNumber).toBeDefined();
  });

  it('retrieves all batch reports', async () => {
    const all = await reportService.getAllReports();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });
});
