import { apiClient, normalizeData } from './apiClient';
import { BATCH_REPORTS } from '@/data/reports';

export const reportService = {
  async getBatchReport(batchNumber, age = '', flavour = '') {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/reports/batch', {
          batchNumber,
          age,
          flavour,
        });
        const data = normalizeData(res);
        if (data) return data;
      } catch (err) {
        console.warn('[reportService] getBatchReport backend error, falling back:', err);
      }
    }

    const cleanBatch = (batchNumber || '').trim().toUpperCase();
    const found = BATCH_REPORTS.find(
      (r) => r.batchNumber.toUpperCase() === cleanBatch
    );

    if (found) return found;

    if (age || flavour) {
      const matched = BATCH_REPORTS.find((r) => {
        const matchesAge = !age || r.ageRange.toLowerCase().includes(age.toLowerCase());
        const matchesFlavour = !flavour || r.flavour.toLowerCase() === flavour.toLowerCase();
        return matchesAge && matchesFlavour;
      });
      if (matched) return matched;
    }

    return BATCH_REPORTS[0] || null;
  },

  async getAllReports() {
    const isMock = import.meta.env.VITE_USE_MOCK !== 'false';

    if (!isMock) {
      try {
        const res = await apiClient.get('/reports');
        const data = normalizeData(res);
        if (Array.isArray(data) && data.length > 0) return data;
      } catch (err) {
        console.warn('[reportService] getAllReports backend error, falling back:', err);
      }
    }

    return BATCH_REPORTS;
  },
};

export default reportService;
