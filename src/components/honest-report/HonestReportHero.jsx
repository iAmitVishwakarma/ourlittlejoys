import React from 'react';
import { ShieldCheck, FileCheck, Sparkles, Microscope, Award } from 'lucide-react';
import ResponsiveImage from '@/components/common/ResponsiveImage';

export default function HonestReportHero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 sm:pt-16 pb-20 sm:pb-24 px-4 md:px-6">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-brand-berry/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="lg:w-3/5 text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
              100% Transparency Promise
            </span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight font-brand-display">
            Nutrimix Honest Reports
          </h1>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C89B58]">Why We Test?</span>
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
                <Sparkles className="w-4 h-4 text-[#C89B58] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">Zero Heavy Metals</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/5 flex justify-center lg:justify-end relative mt-4 lg:mt-0">
          <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-linear-to-br from-[#1F3C24]/20 to-[#C89B58]/20 rounded-full blur-2xl animate-pulse" />
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
  );
}
