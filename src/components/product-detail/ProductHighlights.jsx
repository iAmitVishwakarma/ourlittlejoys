import React from 'react';

export default function ProductHighlights() {
  return (
    <section className="py-6">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
        <span className="text-xs font-black uppercase tracking-widest text-[#13805B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Evidence-Backed Nutrition
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Why Nestor Works So Well
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Formulated to fill vital nutrient gaps without upsetting delicate young tummies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-all space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-2xs">
            🌾
          </div>
          <h3 className="text-base font-black text-slate-900">Healthy Physical Growth</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Sprouted Ragi and Bajra deliver high-bioavailability calcium and plant protein for strong bones, teeth, and natural height gain.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#1F3C24] transition-all space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C89B58] flex items-center justify-center text-2xl shadow-2xs">
            🧠
          </div>
          <h3 className="text-base font-black text-slate-900 font-brand-display">Sharper Focus &amp; Memory</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Pure cocoa polyphenols, iron, and choline fuel growing neural pathways for sustained concentration during school and study hours.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#1F3C24] transition-all space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F7F2] text-[#1F3C24] flex items-center justify-center text-2xl shadow-2xs">
            🛡️
          </div>
          <h3 className="text-base font-black text-slate-900 font-brand-display">Stronger Daily Immunity</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Provides 100% RDA of essential Zinc, Vitamin C, and Vitamin D3 to build daily resistance against seasonal colds and coughs.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#1F3C24] transition-all space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-2xs">
            🥣
          </div>
          <h3 className="text-base font-black text-slate-900 font-brand-display">Gentle Tummy Digestion</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Sprouting breaks down complex starches into simple, easily absorbable nutrients with zero bloating, heaviness, or white sugar spikes.
          </p>
        </div>
      </div>
    </section>
  );
}
