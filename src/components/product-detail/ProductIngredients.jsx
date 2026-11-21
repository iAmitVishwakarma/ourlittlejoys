import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2 } from 'lucide-react';

export default function ProductIngredients({ product }) {
  return (
    <section className="py-6">
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-orange-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#13805B]">
              Radical Transparency
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              What's Inside Every Scoop
            </h2>
          </div>
          <Link
            to="/honest-report"
            className="text-xs font-black text-[#13805B] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>View NABL Lab Test Certificate</span>
          </Link>
        </div>

        {/* 5 Clean Ingredient Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-center">
          <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
            <span className="text-3xl block mb-2">🌾</span>
            <span className="text-sm font-black text-slate-900 block">Sprouted Ragi</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">High Calcium</span>
          </div>
          <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
            <span className="text-3xl block mb-2">🍫</span>
            <span className="text-sm font-black text-slate-900 block">Real Cocoa</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">Brain Polyphenols</span>
          </div>
          <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
            <span className="text-3xl block mb-2">🍯</span>
            <span className="text-sm font-black text-slate-900 block">Dhampur Jaggery</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">Zero White Sugar</span>
          </div>
          <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
            <span className="text-3xl block mb-2">🥣</span>
            <span className="text-sm font-black text-slate-900 block">Pearl Millet</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">Iron &amp; Energy</span>
          </div>
          <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100 col-span-2 sm:col-span-1">
            <span className="text-3xl block mb-2">🥜</span>
            <span className="text-sm font-black text-slate-900 block">Almonds &amp; Walnuts</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">Healthy Brain Fats</span>
          </div>
        </div>

        {/* Full Ingredients Statement */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          <strong className="text-slate-900 font-bold">Complete Formulation: </strong>
          {product.ingredients ||
            'Sprouted Finger Millet (Ragi), Pearl Millet (Bajra), Rolled Oats, Pure Alkalized Cocoa, Dhampur Organic Jaggery, Almonds, Walnuts, Whey Protein Isolate, 18 Essential Vitamins & Minerals (Vitamin A, C, D3, E, B-Complex, Zinc Gluconate, Iron Bisglycinate). Zero Artificial Colours or Preservatives.'}
        </div>
      </div>
    </section>
  );
}
