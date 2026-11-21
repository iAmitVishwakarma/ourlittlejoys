import React from 'react';
import { Stethoscope, Smile, Heart } from 'lucide-react';

export default function HomeTrustPillars() {
  return (
    <section className="py-6 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-linear-to-br from-white to-brand-primary-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 border border-emerald-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0 border border-emerald-100">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Developed by
              </span>
              <span className="text-sm md:text-base font-black text-slate-900">EXPERTS</span>
              <p className="text-xs text-slate-500">Pediatrician-formulated ICMR dosages</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Tasted by
              </span>
              <span className="text-sm md:text-base font-black text-slate-900">KIDS</span>
              <p className="text-xs text-slate-500">Yummy real cocoa &amp; fruit pectin</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Approved by
              </span>
              <span className="text-sm md:text-base font-black text-slate-900">PARENTS</span>
              <p className="text-xs text-slate-500">Over 2,00,000+ happy Indian families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
