import React from 'react';
import { Search, ChevronDown, AlertCircle } from 'lucide-react';

export default function HonestReportSelector({
  selectedAge,
  setSelectedAge,
  ageOptions,
  selectedFlavour,
  setSelectedFlavour,
  flavourOptions,
  manualBatch,
  setManualBatch,
  sampleBatches,
  errorMessage,
  setErrorMessage,
  onSubmit,
}) {
  return (
    <section className="container mx-auto max-w-4xl px-3.5 sm:px-4 md:px-6 -mt-10 sm:-mt-12 relative z-20">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-5 sm:mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">Fetch Your Batch Certificate</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Enter your batch details below to instantly view third-party lab verification.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
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

          {/* Sample batch chips */}
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

          {/* Error Message */}
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
  );
}
