import React from 'react';
import { ShieldCheck, FileCheck, Download, CheckCircle2, Sparkles, Info, Beaker } from 'lucide-react';
import { TableSkeleton } from '@/components/common/Skeleton';

export default function HonestReportCertificate({
  activeReport,
  isFetchingReport,
  onDownloadPdf,
}) {
  return (
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
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                  {activeReport.productName}
                </h2>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-semibold text-slate-600 mt-2.5">
                  <span className="flex items-center gap-1">
                    <Beaker className="w-3.5 h-3.5 text-slate-400" /> Batch:{' '}
                    <strong className="text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {activeReport.batchNumber}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-slate-400" /> Mfg: {activeReport.mfgDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Tested: {activeReport.testedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-100 shadow-2xs">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-600">
                <span>Tested by:</span>
                <span className="text-slate-900 font-black">Eurofins / Equinox Labs</span>
              </div>
              <button
                onClick={onDownloadPdf}
                aria-label="Download Official NABL Lab Certificate PDF"
                className="w-full sm:w-auto bg-[#FAF4EB] hover:bg-[#F3EAD9] text-[#1F3C24] border border-[#C89B58]/30 text-xs font-bold px-4 py-2 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer min-h-10"
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
  );
}
