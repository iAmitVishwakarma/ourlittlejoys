import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function HomeHonestReportPreview() {
  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-primary bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Radical Transparency
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Honest Reports: Tested &amp; Certified
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every production batch is tested by independent NABL-accredited laboratories. We publish
            full test certificates for every parent to inspect.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shadow-xs">
              🛡️
            </div>
            <h3 className="text-base font-black text-slate-900">Heavy Metal Screened</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Tested for Lead, Mercury, Arsenic, and Cadmium with reports strictly below 0.01 ppm
              detection limit.
            </p>
            <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>&lt;0.01 ppm Heavy Metals</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>NABL Lab Certified Batch-Wise</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-xs">
              🍯
            </div>
            <h3 className="text-base font-black text-slate-900">Zero Refined Sugar</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Clean sweetness exclusively derived from organic Dhampur jaggery, raw dates, and
              natural fruit pulp.
            </p>
            <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>0% White Refined Sugar</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>100% Dhampur Organic Jaggery</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-primary flex items-center justify-center text-xl shadow-xs">
              👩‍⚕️
            </div>
            <h3 className="text-base font-black text-slate-900">Pediatrician Endorsed</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Co-created with pediatric doctors according to ICMR Recommended Dietary Allowances for
              Indian kids.
            </p>
            <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>100% Daily ICMR Dosages</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-3.5 h-3.5 stroke-3" />
                <span>Clinically Reviewed &amp; Safe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/honest-report"
            className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-brand-primary font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-emerald-200 shadow-xs transition-colors min-h-11"
          >
            <span>Search Your Product Batch Code</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
