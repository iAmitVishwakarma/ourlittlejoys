import React, { useState, useEffect, useRef } from 'react';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import { KidStampBadge } from '@/components/graphics/KidsDoodles';
import { BATCH_REPORTS } from '@/data/reports';
import { reportService } from '@/services/reportService';
import {
  HonestReportHero,
  HonestReportSelector,
  HonestReportCertificate,
  HonestReportFAQ,
  HonestReportCertifications,
} from '@/components/honest-report';

const AGE_OPTIONS = ['2-6 Yr', '4-6 Yr', '7-12 Yr', '13-18 Yr'];
const FLAVOUR_OPTIONS = ['Chocolate', 'Mixed Berry', 'Unsweetened'];
const SAMPLE_BATCHES = [
  { code: 'SL-2026-NM09', name: 'SL-2026-NM09 (Nutrimix Chocolate 2-6 Yr)' },
  { code: 'SL-2026-NM07', name: 'SL-2026-NM07 (Nutrimix Chocolate 7-12 Yr)' },
  { code: 'SL-2026-GM04', name: 'SL-2026-GM04 (Multivitamin Gummies 4+)' },
];

export default function HonestReport() {
  const [selectedAge, setSelectedAge] = useState('2-6 Yr');
  const [selectedFlavour, setSelectedFlavour] = useState('Chocolate');
  const [selectedBatch] = useState('SL-2026-NM09');
  const [manualBatch, setManualBatch] = useState('');
  const [activeReport, setActiveReport] = useState(BATCH_REPORTS[0]);
  const [isFetchingReport, setIsFetchingReport] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
    };
  }, []);

  const handleGetReport = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsFetchingReport(true);

    if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
    fetchTimerRef.current = setTimeout(async () => {
      const queryBatch = (manualBatch.trim() || selectedBatch).toUpperCase();

      try {
        const found = await reportService.getBatchReport(queryBatch, selectedAge, selectedFlavour);
        if (found) {
          setActiveReport(found);
        } else {
          setErrorMessage(
            `Oops! We couldn't find batch '${queryBatch}'. Please check the bottom of your jar for a batch starting with 'SL-'. Example: SL-2026-NM09.`
          );
        }
      } catch {
        setErrorMessage(`Unable to retrieve report for '${queryBatch}'. Please try again.`);
      } finally {
        setIsFetchingReport(false);
      }
    }, 280);
  };

  const handleDownloadPdf = () => {
    alert(
      `Downloading Official NABL Lab Certificate for Batch: ${activeReport.batchNumber} (PDF format). Complete test report verified.`
    );
  };

  return (
    <div className="bg-brand-cream min-h-screen pb-28 sm:pb-20 font-sans">
      <SEO
        title="Nutrimix Honest Lab Reports | Verified NABL Third-Party Testing | Nestor"
        description="View independent NABL lab test results for Nestor batches. Certified heavy-metal safe, 100% protein assay verified, 0% refined sugar."
        keywords="NABL lab reports, Nestor test results, heavy metal test kids nutrition, honest nutrition certificate"
        canonical="https://nestorbio.com/honest-report"
      />

      <HonestReportHero />

      <HonestReportSelector
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        ageOptions={AGE_OPTIONS}
        selectedFlavour={selectedFlavour}
        setSelectedFlavour={setSelectedFlavour}
        flavourOptions={FLAVOUR_OPTIONS}
        manualBatch={manualBatch}
        setManualBatch={setManualBatch}
        sampleBatches={SAMPLE_BATCHES}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        onSubmit={handleGetReport}
      />

      <HonestReportCertificate
        activeReport={activeReport}
        isFetchingReport={isFetchingReport}
        onDownloadPdf={handleDownloadPdf}
      />

      <div className="container mx-auto max-w-6xl px-4 my-8 sm:my-10">
        <ScallopDivider
          direction="up"
          color="text-slate-200"
          centerBadge={<KidStampBadge text="Trusted by 2 Lakh+ Indian Parents" />}
        />
      </div>

      <HonestReportFAQ />

      <HonestReportCertifications />
    </div>
  );
}
