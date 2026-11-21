import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, FileCheck2 } from 'lucide-react';
import {
  VeggiesClusterDoodle,
  CarrotDoodle,
  ScienceNutritionSeal,
  SprigDoodle,
  AppleFruitDoodle,
} from '@/components/graphics/KidsDoodles';

export default function ProductScienceCare({
  scienceTab,
  setScienceTab,
  openScienceAccordion,
  setOpenScienceAccordion,
}) {
  return (
    <section className="py-6 space-y-6">
      {/* Signature Mint Green Botanical Banner */}
      <div className="bg-[#D2EBE0] border border-[#B5DEC9] rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden shadow-xs">
        <div className="flex items-end justify-center gap-3 sm:gap-6 flex-wrap">
          <VeggiesClusterDoodle className="w-12 sm:w-16 h-12 sm:h-16 text-emerald-700 hover:scale-105 transition-transform" />
          <CarrotDoodle className="w-10 sm:w-12 h-16 sm:h-20 hover:scale-105 transition-transform" />

          <div className="mx-1 sm:mx-3 hover:rotate-6 transition-transform">
            <ScienceNutritionSeal className="w-24 sm:w-32 h-24 sm:h-32 drop-shadow-sm" />
          </div>

          <SprigDoodle className="w-10 sm:w-12 h-14 sm:h-16 text-emerald-700 hover:scale-105 transition-transform" />
          <AppleFruitDoodle className="w-10 sm:w-12 h-12 sm:h-14 hover:scale-105 transition-transform" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-[#0B4A34] tracking-tight uppercase mt-4">
          BACKED BY SCIENCE + CARE
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#18533E] max-w-xl mx-auto mt-1 leading-relaxed">
          Formulated alongside India's top pediatricians and nutrition scientists to meet 100% ICMR RDA requirements.
        </p>

        {/* 4 Clinical Certifications Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-6 pt-5 border-t border-[#B5DEC9]/80 text-left sm:text-center">
          <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
            <span className="text-lg block">🛡️</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">NABL Lab Tested</span>
            <span className="text-[11px] text-slate-600 font-medium block">&lt;0.01 ppm Heavy Metals</span>
          </div>

          <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
            <span className="text-lg block">🍯</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">Zero Refined Sugar</span>
            <span className="text-[11px] text-slate-600 font-medium block">100% Clean Sweetness</span>
          </div>

          <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
            <span className="text-lg block">🩺</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">Pediatrician Approved</span>
            <span className="text-[11px] text-slate-600 font-medium block">100% ICMR Dosages</span>
          </div>

          <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
            <span className="text-lg block">🌿</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">100% Vegetarian</span>
            <span className="text-[11px] text-slate-600 font-medium block">Zero Gelatin / Palm Oil</span>
          </div>
        </div>
      </div>

      {/* Layer 2 Deep Education: Interactive Tabs & Accordions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-xs space-y-5">
        <div className="flex justify-center">
          <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setScienceTab('vitamins')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                scienceTab === 'vitamins'
                  ? 'bg-[#13805B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vitamins &amp; Minerals
            </button>
            <button
              onClick={() => setScienceTab('ingredients')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                scienceTab === 'ingredients'
                  ? 'bg-[#13805B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Whole Food Ingredients
            </button>
          </div>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {scienceTab === 'vitamins' ? (
            <>
              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 0 ? null : 0)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🦴</span>
                    <h4 className="text-sm font-black text-slate-900">
                      High-Bioavailability Calcium &amp; Vitamin D3
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 0 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 0 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Fortified with plant-derived calcium and clean Vitamin D3 to ensure 100% of the recommended bone mineralization in children during active growth spurts.
                  </p>
                )}
              </div>

              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 1 ? null : 1)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🛡️</span>
                    <h4 className="text-sm font-black text-slate-900">
                      Zinc &amp; Vitamin C Daily Immunity Shield
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 1 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 1 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Zinc gluconate combined with pure citrus Vitamin C works synergistically to power white blood cell responses against seasonal viral changes and school bugs.
                  </p>
                )}
              </div>

              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 2 ? null : 2)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧠</span>
                    <h4 className="text-sm font-black text-slate-900">
                      Iron Bisglycinate &amp; Active B-Complex
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 2 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 2 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Gentle iron chelate prevents tummy constipation while supporting optimal oxygen delivery to brain cells, improving daytime attention span and classroom memory.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 0 ? null : 0)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🌾</span>
                    <h4 className="text-sm font-black text-slate-900">
                      Sprouted Ragi &amp; Pearl Millet (Bajra)
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 0 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 0 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Sprouting grains deactivates anti-nutritional phytates, unlocking 300% greater natural iron and calcium absorption with zero digestive heaviness.
                  </p>
                )}
              </div>

              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 1 ? null : 1)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍫</span>
                    <h4 className="text-sm font-black text-slate-900">
                      Pure Alkalized Cocoa &amp; Brain Polyphenols
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 1 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 1 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Real cocoa delivers the chocolate taste kids adore, while naturally supplying flavanols that boost cerebral blood circulation and mood stability.
                  </p>
                )}
              </div>

              <div
                onClick={() => setOpenScienceAccordion(openScienceAccordion === 2 ? null : 2)}
                className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🍯</span>
                    <h4 className="text-sm font-black text-slate-900">
                      Organic Dhampur Jaggery (Zero White Sugar)
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openScienceAccordion === 2 ? 'rotate-180 text-[#13805B]' : ''
                    }`}
                  />
                </div>
                {openScienceAccordion === 2 && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                    Traditional slow-cooked jaggery retains natural magnesium and potassium, providing gentle sweetness with a lower glycemic index and zero sugar crashes.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="pt-2 text-center">
          <Link
            to="/honest-report"
            className="inline-flex items-center gap-2 bg-[#13805B] hover:bg-[#0E6346] text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Download Certified NABL Lab Heavy-Metal Report</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
