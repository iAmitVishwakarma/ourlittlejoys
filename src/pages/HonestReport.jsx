import React, { useState } from 'react';
import { BATCH_REPORTS } from '@/data/reports';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import { 
  ShieldCheck, 
  FileCheck, 
  Search, 
  ChevronDown, 
  Download, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  Microscope, 
  Info, 
  Beaker 
} from 'lucide-react';
import { KidStampBadge } from '@/components/graphics/KidsDoodles';
import { TableSkeleton } from '@/components/common/Skeleton';
import ResponsiveImage from '@/components/common/ResponsiveImage';

export default function HonestReport() {
  const [selectedAge, setSelectedAge] = useState('2-6 Yr');
  const [selectedFlavour, setSelectedFlavour] = useState('Chocolate');
  const [selectedBatch, setSelectedBatch] = useState('SL-2026-NM09');
  const [manualBatch, setManualBatch] = useState('');
  const [activeReport, setActiveReport] = useState(BATCH_REPORTS[0]);
  const [isFetchingReport, setIsFetchingReport] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const ageOptions = ['2-6 Yr', '4-6 Yr', '7-12 Yr', '13-18 Yr'];
  const flavourOptions = ['Chocolate', 'Mixed Berry', 'Unsweetened'];
  const sampleBatches = [
    { code: 'SL-2026-NM09', name: 'SL-2026-NM09 (Nutrimix Chocolate 2-6 Yr)' },
    { code: 'SL-2026-NM07', name: 'SL-2026-NM07 (Nutrimix Chocolate 7-12 Yr)' },
    { code: 'SL-2026-GM04', name: 'SL-2026-GM04 (Multivitamin Gummies 4+)' }
  ];

  const handleGetReport = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsFetchingReport(true);

    setTimeout(() => {
      const queryBatch = (manualBatch.trim() || selectedBatch).toUpperCase();

      const found = BATCH_REPORTS.find(
        (r) => r.batchNumber.toUpperCase() === queryBatch ||
               (r.ageRange === selectedAge && r.flavour.toLowerCase() === selectedFlavour.toLowerCase())
      );

      if (found) {
        setActiveReport(found);
      } else {
        setErrorMessage(`Oops! We couldn't find batch '${queryBatch}'. Please check the bottom of your jar for a batch starting with 'SL-'. Example: SL-2026-NM09.`);
      }
      setIsFetchingReport(false);
    }, 280);
  };

  const handleDownloadPdf = () => {
    alert(`Downloading Official NABL Lab Certificate for Batch: ${activeReport.batchNumber} (PDF format). Complete test report verified.`);
  };

  const faqs = [
    {
      q: "How accredited is the Lab where it is tested?",
      a: "All Little Joys batches are tested exclusively at NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited independent third-party laboratories such as Equinox Labs and Eurofins India, compliant with ISO/IEC 17025."
    },
    {
      q: "Are these reports verified by an independent lab?",
      a: "Yes! We do not test in-house to prevent bias. Our samples are randomly drawn from our manufacturing facility and sent directly to government-recognized independent testing centers."
    },
    {
      q: "How frequently are these tests carried out?",
      a: "Every single production batch undergoes mandatory testing before leaving the warehouse. No product is released into the market until all microbiological, protein, and heavy metal assays receive full sign-off."
    },
    {
      q: "How do I read the Protein Report?",
      a: "The Protein Report uses the gold-standard Kjeldahl Method (IS 7219). It states the 'Claim on Pack' (e.g. 16.0g/100g) versus the 'Actual Test Result' (e.g. 18.4g/100g). A passing status means your child gets equal to or more than what is promised on the box."
    },
    {
      q: "Why do you test for heavy metals?",
      a: "Soil and water often contain trace minerals that plants absorb. For young children, heavy metals like Lead, Mercury, Arsenic, and Cadmium are neurotoxic even in modest amounts. We screen every batch to ensure heavy metals are 'Below Detectable Limits (BDL)'."
    },
    {
      q: "How do I read the Heavy Metals Report?",
      a: "Look at the 'Test Result' column. You will see 'BDL' (Below Detectable Limit). This means our ultra-sensitive ICP-MS equipment detected virtually zero trace, well below FSSAI and WHO limits."
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen pb-28 sm:pb-20 font-sans">
      <SEO 
        title="Nutrimix Honest Lab Reports | Verified NABL Third-Party Testing"
        description="View independent NABL lab test results for Little Joys batches. Certified heavy-metal safe, 100% protein assay verified, 0% refined sugar."
        keywords="NABL lab reports, Little Joys test results, heavy metal test kids nutrition, honest nutrition certificate"
        canonical="https://ourlittlejoys.com/honest-report"
      />
      
      {/* 1. Hero Section - What? Why? How? */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-10 sm:pt-16 pb-20 sm:pb-24 px-4 md:px-6">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>
        
        {/* Abstract glow shapes */}
        <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-brand-berry/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-3/5 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                100% Transparency Promise
              </span>
            </div>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Nutrimix Honest Reports
            </h1>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Why We Test?</span>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Because your child's health deserves complete transparency. We test every single batch at independent NABL-accredited labs before release.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Testing Standards</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">NABL Certified Labs</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Verified Nutrition</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">Zero Heavy Metals</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Content */}
          <div className="lg:w-2/5 flex justify-center lg:justify-end relative mt-4 lg:mt-0">
             <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-linear-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute inset-2 sm:inset-4 bg-white/10 border border-white/20 backdrop-blur-xl rounded-4xl flex items-center justify-center shadow-2xl p-3">
                    <ResponsiveImage 
                      src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80" 
                      alt="Nutrimix Product Visual" 
                      width={280}
                      height={280}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl border border-slate-100 flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase leading-none">Certified</p>
                        <p className="text-xs sm:text-sm font-black text-slate-800 leading-tight">ISO 17025</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Report Finder Form */}
      <section className="container mx-auto max-w-4xl px-3.5 sm:px-4 md:px-6 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="mb-5 sm:mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                <Search className="w-5 h-5" />
            </div>
            <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Fetch Your Batch Certificate</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Enter your batch details below to instantly view third-party lab verification.</p>
            </div>
          </div>

          <form onSubmit={handleGetReport} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
              {/* Step 1: Age Range */}
              <div className="space-y-1.5 relative">
                <label htmlFor="honest-age-select" className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px] font-black">1</span>
                  <span>Select Age</span>
                </label>
                <div className="relative">
                  <select
                    id="honest-age-select"
                    value={selectedAge}
                    onChange={(e) => setSelectedAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 pr-10 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-forest focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all cursor-pointer"
                  >
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Step 2: Flavour */}
              <div className="space-y-1.5 relative">
                <label htmlFor="honest-flavour-select" className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px] font-black">2</span>
                  <span>Select Flavour</span>
                </label>
                <div className="relative">
                  <select
                    id="honest-flavour-select"
                    value={selectedFlavour}
                    onChange={(e) => setSelectedFlavour(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 pr-10 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-brand-forest focus:ring-4 focus:ring-emerald-500/10 appearance-none transition-all cursor-pointer"
                  >
                    {flavourOptions.map((fl) => (
                      <option key={fl} value={fl}>{fl}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Step 3: Batch Number */}
              <div className="space-y-1.5 relative sm:col-span-2 md:col-span-1">
                <label htmlFor="honest-manual-batch" className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px] font-black">3</span>
                  <span>Enter Batch Number</span>
                </label>
                <input
                  id="honest-manual-batch"
                  type="text"
                  placeholder="e.g. SL-2026-NM09"
                  value={manualBatch}
                  onChange={(e) => {
                    setManualBatch(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-3 text-xs sm:text-sm font-bold text-slate-800 uppercase placeholder:normal-case placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:border-brand-forest focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner shadow-slate-50/50"
                />
              </div>
            </div>

            {/* Hint for sample batches */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-slate-500 font-medium text-[11px] sm:text-xs">Sample batch codes:</span>
              {sampleBatches.map((b) => (
                <button 
                  key={b.code}
                  type="button"
                  onClick={() => {
                    setManualBatch(b.code);
                    setErrorMessage('');
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-bold rounded-lg transition-colors border border-slate-200 text-[11px] sm:text-xs cursor-pointer active:scale-95"
                >
                  {b.code}
                </button>
              ))}
            </div>

            {/* Error State */}
            {errorMessage && (
              <div className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-rose-800 bg-rose-50 p-3.5 sm:p-4 rounded-2xl border border-rose-200 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-forest hover:bg-brand-primary-hover text-white font-black py-3 sm:py-3.5 px-7 sm:px-8 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 flex items-center justify-center gap-2 sm:ml-auto shadow-md shadow-brand-forest/20 cursor-pointer min-h-11"
            >
              <span>View Lab Report</span>
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 3. Live Interactive Lab Report Certificate */}
      <section className="container mx-auto max-w-4xl px-3.5 sm:px-4 md:px-6 mt-8 sm:mt-12">
        <div className="bg-white rounded-2xl sm:rounded-4xl p-1 shadow-md border border-slate-200 relative overflow-hidden">
          <div className="bg-slate-50/80 rounded-xl sm:rounded-[1.75rem] p-4 sm:p-6 md:p-8">
            {/* Top Verified Stamp */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-200">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="bg-emerald-100 text-emerald-800 text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full">
                      {activeReport.overallStatus}
                    </span>
                    <span className="text-[10.5px] sm:text-xs font-mono font-medium text-slate-500 truncate max-w-50 sm:max-w-none">
                      Cert: {activeReport.certificationNumber}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">{activeReport.productName}</h2>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-semibold text-slate-600 mt-2.5">
                    <span className="flex items-center gap-1"><Beaker className="w-3.5 h-3.5 text-slate-400"/> Batch: <strong className="text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">{activeReport.batchNumber}</strong></span>
                    <span className="flex items-center gap-1"><FileCheck className="w-3.5 h-3.5 text-slate-400"/> Mfg: {activeReport.mfgDate}</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-slate-400"/> Tested: {activeReport.testedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-100 shadow-2xs">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-600">
                  <span>Tested by:</span>
                  <span className="text-slate-900 font-black">Eurofins / Equinox Labs</span>
                </div>
                <button
                  onClick={handleDownloadPdf}
                  aria-label="Download Official NABL Lab Certificate PDF"
                  className="w-full sm:w-auto bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold px-4 py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer min-h-10"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Download Original PDF</span>
                </button>
              </div>
            </div>

            {isFetchingReport ? (
              <div className="py-8 space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <div className="w-4 h-4 rounded-full border-2 border-brand-forest border-t-transparent animate-spin" />
                  <span>Fetching verified batch records from NABL-accredited laboratory database...</span>
                </div>
                <TableSkeleton rows={3} cols={5} />
                <TableSkeleton rows={4} cols={4} />
              </div>
            ) : (
              <div className="py-6 sm:py-8 grid gap-6 sm:gap-8 animate-in fade-in duration-200">
                {/* Report Breakdown 1: Protein Assay */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800">
                      Protein Content Analysis
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto scrollbar-none touch-scroll">
                      <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr className="text-slate-500 font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Parameter</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4 hidden sm:table-cell">Method</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Claim on Pack</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Lab Result</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold text-slate-800">
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-3.5 sm:px-5 py-3 sm:py-4 font-bold">{activeReport.proteinAnalysis.parameter}</td>
                            <td className="px-3.5 sm:px-5 py-3 sm:py-4 text-slate-500 text-xs hidden sm:table-cell">{activeReport.proteinAnalysis.testMethod}</td>
                            <td className="px-3.5 sm:px-5 py-3 sm:py-4 text-slate-500 line-through decoration-slate-400">{activeReport.proteinAnalysis.claimOnPack}</td>
                            <td className="px-3.5 sm:px-5 py-3 sm:py-4 font-black text-base sm:text-lg text-emerald-600">{activeReport.proteinAnalysis.actualResult}</td>
                            <td className="px-3.5 sm:px-5 py-3 sm:py-4">
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black uppercase">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Pass
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Explainer Layer */}
                    <div className="bg-blue-50/50 px-3.5 sm:px-5 py-3 sm:py-4 border-t border-blue-100 flex items-start gap-2.5">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-blue-900 mb-0.5">What does this mean for my child?</h4>
                        <p className="text-[11px] sm:text-xs text-blue-800 font-medium leading-relaxed">
                          We claimed {activeReport.proteinAnalysis.claimOnPack} of protein, but the lab found {activeReport.proteinAnalysis.actualResult}. 
                          This means your child gets <strong className="font-black">equal to or slightly more protein</strong> than what's promised on the box. No protein spiking, just honest nutrition.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Breakdown 2: Heavy Metals Report */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-800">
                        Heavy Metals Screening
                      </h3>
                    </div>
                    <span className="inline-flex bg-emerald-100 text-emerald-800 text-[9.5px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full self-start sm:self-auto">
                      Result: Below Detectable Limits (Safe)
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto scrollbar-none touch-scroll">
                      <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr className="text-slate-500 font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Toxic Metal</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4 hidden md:table-cell">FSSAI Limit (ppm)</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4">Actual Result</th>
                            <th className="px-3.5 sm:px-5 py-3 sm:py-4 text-right">Safety Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {activeReport.heavyMetals.map((m, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3.5 sm:px-5 py-3 sm:py-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                <span className="font-bold text-slate-900">{m.parameter}</span>
                              </td>
                              <td className="px-3.5 sm:px-5 py-3 sm:py-4 text-slate-500 hidden md:table-cell font-mono text-xs">{m.permissibleLimit}</td>
                              <td className="px-3.5 sm:px-5 py-3 sm:py-4 font-black text-emerald-600 bg-emerald-50/30">
                                {m.testResult} <span className="text-[10px] font-bold text-emerald-700/60 ml-1">BDL</span>
                              </td>
                              <td className="px-3.5 sm:px-5 py-3 sm:py-4 text-right">
                                <span className="inline-flex text-emerald-600 text-xs font-black">
                                  ✓ Safe
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Explainer Layer */}
                    <div className="bg-emerald-50/50 px-3.5 sm:px-5 py-3 sm:py-4 border-t border-emerald-100 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-900 mb-0.5">What does BDL mean?</h4>
                        <p className="text-[11px] sm:text-xs text-emerald-800 font-medium leading-relaxed">
                          BDL stands for <strong className="font-black">Below Detectable Limits</strong>. 
                          Heavy metals like lead and arsenic naturally occur in soil, but our strict sourcing ensures 
                          that any trace is so microscopically small that highly sensitive lab equipment (ICP-MS) cannot even detect it.
                          It is 100% safe for daily consumption by toddlers and kids.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 〰️ STRATEGIC SCALLOP DIVIDER 〰️ */}
      <div className="container mx-auto max-w-6xl px-4 my-8 sm:my-10">
        <ScallopDivider 
          direction="up" 
          color="text-slate-200" 
          centerBadge={<KidStampBadge text="Trusted by 2 Lakh+ Indian Parents" />} 
        />
      </div>

      {/* FAQs Section */}
      <section className="container mx-auto max-w-3xl px-3.5 sm:px-4 md:px-6 mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-pink-500 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Have Concerns?</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
            Commonly Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === idx ? 'border-pink-200 shadow-md shadow-pink-100/50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center font-bold text-xs sm:text-sm text-slate-800 hover:text-pink-600 transition-colors cursor-pointer"
              >
                <span className="pr-4 sm:pr-8 leading-snug">{faq.q}</span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? 'bg-pink-50' : 'bg-slate-50'}`}>
                  <ChevronDown
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-pink-500' : 'text-slate-400'}`}
                  />
                </div>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="container mx-auto max-w-4xl px-3.5 sm:px-4 md:px-6 mb-8 sm:mb-12 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-slate-600 font-bold text-xs sm:text-sm">
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">FSSAI Certified Facility</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">NABL Accredited</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="text-[11px] sm:text-xs">ISO 22000 Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
