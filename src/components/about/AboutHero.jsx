import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CrownDoodle, HeartDoodle, MiniStarCluster, CurlyArrowDoodle } from '@/components/graphics/KidsDoodles';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#FDBA74 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89B58]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FFFBEB] border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
              <span>💡</span> OUR STORY
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] font-brand-display">
              Big Nutrition <br />
              for <span className="text-[#1F3C24]">Growing Kids</span>
              <span className="text-[#C89B58]">.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
              We're a team of parents, doctors and nutrition experts on a mission to make children's nutrition simple, honest and joyful.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
              <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                <span className="text-base">🧑‍🤝‍🧑</span>
                <span>Parent Founded</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                <span className="text-base">🩺</span>
                <span>Doctor Guided</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                <span className="text-base">🌿</span>
                <span>Child Approved</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#from-home-to-yours"
                className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-slate-900/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Our Journey</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2">
                <CurlyArrowDoodle className="w-8 h-8 text-slate-400 rotate-[-12deg]" />
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold italic">
                  loved daily by <br />
                  <span className="text-[#1F3C24] font-bold not-italic">happiest growing champions ✨</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#C89B58]/30 shadow-md flex items-center gap-2 text-xs font-black text-slate-800 z-20">
              <span>Good Nutrition Brighter Tomorrows</span>
              <span className="text-[#C89B58]">✨</span>
            </div>

            <div className="w-72 sm:w-84 md:w-96 h-72 sm:h-84 md:h-96 rounded-full bg-gradient-to-tr from-amber-100 via-orange-50 to-[#FAF4EB] p-2 sm:p-3 relative shadow-inner">
              <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20 animate-bounce duration-1000">
                <CrownDoodle className="w-14 h-11" />
              </div>

              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=700&q=80"
                  alt="Happy child drinking clean nutrition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-2.5 rounded-2xl border-2 border-emerald-200 shadow-xl z-20 flex items-center gap-3">
                <div className="w-12 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex flex-col items-center justify-center text-white shadow-xs relative overflow-hidden">
                  <span className="text-base font-black leading-none">LJ</span>
                  <span className="text-[7px] font-bold tracking-tight uppercase mt-0.5">Nutrimix</span>
                  <span className="absolute bottom-0 inset-x-0 h-1.5 bg-amber-300" />
                </div>
                <div className="pr-2">
                  <p className="text-[11px] font-black text-slate-900 leading-tight">Nutrimix</p>
                  <p className="text-[10px] text-emerald-600 font-bold">100% Sprouted Ragi</p>
                  <div className="flex items-center gap-1 text-[9px] text-amber-500 mt-0.5 font-extrabold">
                    <span>★ 4.8</span>
                    <span className="text-slate-400 font-normal">(4.6k)</span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-1/3">
                <HeartDoodle className="w-6 h-6 text-rose-400 rotate-[-15deg]" />
              </div>
              <div className="absolute -left-2 bottom-6">
                <MiniStarCluster className="text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
