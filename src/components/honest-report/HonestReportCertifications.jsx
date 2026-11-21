import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function HonestReportCertifications() {
  return (
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
          <Sparkles className="w-4 h-4 text-[#C89B58] shrink-0" />
          <span className="text-[11px] sm:text-xs">ISO 22000 Certified</span>
        </div>
      </div>
    </section>
  );
}
