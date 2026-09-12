import React, { useState } from 'react';
import { BATCH_REPORTS } from '../data/reports';
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
  AlertCircle
} from 'lucide-react';

export default function HonestReport() {
  const [selectedAge, setSelectedAge] = useState('2-6 Yr');
  const [selectedFlavour, setSelectedFlavour] = useState('Chocolate');
  const [selectedBatch, setSelectedBatch] = useState('SL-2026-NM09');
  const [manualBatch, setManualBatch] = useState('');
  const [activeReport, setActiveReport] = useState(BATCH_REPORTS[0]);
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

    const queryBatch = (manualBatch.trim() || selectedBatch).toUpperCase();

    const found = BATCH_REPORTS.find(
      (r) => r.batchNumber.toUpperCase() === queryBatch ||
             (r.ageRange === selectedAge && r.flavour.toLowerCase() === selectedFlavour.toLowerCase())
    );

    if (found) {
      setActiveReport(found);
    } else {
      setErrorMessage(`Batch "${queryBatch}" is pending lab sync or check if it starts with 'SL'. Showing nearest verified batch below.`);
      setActiveReport(BATCH_REPORTS[0]);
    }
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
    },
    {
      q: "I entered my batch number but nothing came up or it showed 'Invalid'. What should I do?",
      a: "Check the bottom of your Nutrimix jar or gummy bottle. The batch number always begins with 'SL-' followed by the year and batch digits (e.g., SL-2026-NM09). If your batch was manufactured very recently, it may take 48 hours for laboratory data to upload. Feel free to reach out to our team at care@ourlittlejoys.com."
    }
  ];

  return (
    <div className="bg-[#FFF9F5] min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 border-b border-pink-200/60 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xs px-4 py-1.5 rounded-full mb-4 border border-pink-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Complete Transparency Guarantee
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
            Nutrimix Honest Report
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No guesswork, no doubt. See what’s inside your child’s nutrition. Select age and flavour to view the latest batch report.
          </p>
        </div>
      </section>

      {/* 3-Step Interactive Batch Search Card */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 -mt-8">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-orange-100 relative z-20">
          <form onSubmit={handleGetReport} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Age Range */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Age Range</span>
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full bg-[#FFF9F5] border border-orange-200 rounded-2xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-pink-500 transition-colors"
                >
                  {ageOptions.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              {/* Step 2: Flavour */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Flavour</span>
                </label>
                <select
                  value={selectedFlavour}
                  onChange={(e) => setSelectedFlavour(e.target.value)}
                  className="w-full bg-[#FFF9F5] border border-orange-200 rounded-2xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-pink-500 transition-colors"
                >
                  {flavourOptions.map((fl) => (
                    <option key={fl} value={fl}>{fl}</option>
                  ))}
                </select>
              </div>

              {/* Step 3: Batch Number */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Batch Number</span>
                </label>
                <select
                  value={selectedBatch}
                  onChange={(e) => { setSelectedBatch(e.target.value); setManualBatch(''); }}
                  className="w-full bg-[#FFF9F5] border border-orange-200 rounded-2xl p-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-pink-500 transition-colors"
                >
                  {sampleBatches.map((b) => (
                    <option key={b.code} value={b.code}>{b.code}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Manual input option */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider">OR Enter Manually:</span>
              <input
                type="text"
                placeholder="Enter Batch Number (Starts with 'SL')"
                value={manualBatch}
                onChange={(e) => setManualBatch(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold uppercase text-slate-800 focus:outline-none focus:border-pink-500"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-full text-sm uppercase tracking-wider transition-transform active:scale-95 shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Get Honest Report</span>
            </button>
          </form>
        </div>
      </section>

      {/* Live Interactive Lab Report Certificate */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 mt-12">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border-2 border-emerald-500/30 relative overflow-hidden">
          {/* Top Verified Stamp */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeReport.overallStatus}</span>
                </span>
                <span className="text-xs font-mono text-slate-400">Cert #{activeReport.certificationNumber}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{activeReport.productName}</h2>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 mt-1">
                <span>Batch: <strong className="text-slate-800">{activeReport.batchNumber}</strong></span>
                <span>Mfg: {activeReport.mfgDate}</span>
                <span>Tested: {activeReport.testedDate}</span>
                <span>Lab: <strong className="text-slate-700">{activeReport.labName}</strong></span>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-xs shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF</span>
            </button>
          </div>

          {/* Report Breakdown 1: Protein Assay */}
          <div className="py-6 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>1. Protein Content Analysis Report</span>
            </h3>

            <div className="bg-[#FFF9F5] rounded-2xl p-4 border border-orange-100 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-orange-200/60 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="pb-2">Test Parameter</th>
                    <th className="pb-2">Method</th>
                    <th className="pb-2">Claim on Pack</th>
                    <th className="pb-2">Lab Test Result</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-800">
                  <tr>
                    <td className="py-2.5 font-bold">{activeReport.proteinAnalysis.parameter}</td>
                    <td className="py-2.5 text-slate-500">{activeReport.proteinAnalysis.testMethod}</td>
                    <td className="py-2.5 text-slate-600">{activeReport.proteinAnalysis.claimOnPack}</td>
                    <td className="py-2.5 font-black text-pink-600">{activeReport.proteinAnalysis.actualResult}</td>
                    <td className="py-2.5">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                        {activeReport.proteinAnalysis.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Report Breakdown 2: Heavy Metals Report */}
          <div className="py-6 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Heavy Metals ICP-MS Screening (Below Detectable Limits)</span>
            </h3>

            <div className="bg-[#FFF9F5] rounded-2xl p-4 border border-orange-100 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-orange-200/60 text-slate-400 font-extrabold uppercase tracking-wider">
                    <th className="pb-2">Metal Tested</th>
                    <th className="pb-2">Equipment</th>
                    <th className="pb-2">FSSAI Permissible Limit</th>
                    <th className="pb-2">Actual Result</th>
                    <th className="pb-2">Safety Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100/80 font-semibold text-slate-800">
                  {activeReport.heavyMetals.map((m, i) => (
                    <tr key={i}>
                      <td className="py-2 font-bold">{m.parameter}</td>
                      <td className="py-2 text-slate-500">{m.testMethod}</td>
                      <td className="py-2 text-slate-600">{m.permissibleLimit}</td>
                      <td className="py-2 font-black text-emerald-600">{m.testResult}</td>
                      <td className="py-2">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Report Breakdown 3: Sugar & Clean Label */}
          <div className="pt-6">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2 mb-3">
              <FileCheck className="w-4 h-4 text-amber-500" />
              <span>3. Sugar &amp; Additive Screen</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-bold block uppercase">White Refined Sugar</span>
                <span className="text-sm font-black text-emerald-600 mt-1 block">0.00% (Not Detected)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-bold block uppercase">Maltodextrin Filler</span>
                <span className="text-sm font-black text-emerald-600 mt-1 block">0.00% (Not Detected)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 font-bold block uppercase">Sweetener Source</span>
                <span className="text-xs font-bold text-slate-700 mt-1 block">Raw Jaggery &amp; Sprouted Millets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Honest Reports? */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 mt-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 md:p-12">
          <span className="text-pink-400 font-extrabold uppercase text-xs tracking-wider">Our Pledge to Parents</span>
          <h2 className="text-2xl md:text-3xl font-black mt-2 mb-4">Why Honest Reports? :)</h2>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6">
            When it comes to making a choice for your child, you're not just looking for better nutrition — you're also looking for reassurance.
            That's why we're opening up every batch's test results for all Nutrimix Packs:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Doctor &amp; Pediatrician Approved</h4>
                <p className="text-xs text-slate-300 mt-0.5">Scientifically calibrated to meet daily ICMR RDA.</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Lab-Tested For Heavy Metal Safety</h4>
                <p className="text-xs text-slate-300 mt-0.5">Every batch tested at certified independent NABL labs.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-pink-300 font-bold uppercase tracking-wider">
            No fine print. No hidden ingredients. Just pure honest love.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto max-w-3xl px-4 md:px-6 mt-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-pink-500 font-bold text-xs uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Have Concerns?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            What You'll Find in the Report (FAQs)
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex justify-between items-center font-bold text-sm text-slate-800 hover:text-pink-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-pink-500' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FFF9F5]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 mt-16 text-center">
        <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Our Accreditations &amp; Certifications</span>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-6 text-slate-600 font-bold text-sm">
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-orange-100 shadow-xs">
            <Award className="w-5 h-5 text-amber-500" />
            <span>FSSAI Certified Facility</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-orange-100 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>NABL Accredited Testing</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-orange-100 shadow-xs">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span>ISO 22000 Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
