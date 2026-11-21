import React from 'react';
import { Sparkles, Check, Plus } from 'lucide-react';

export default function ProductBundleSection({
  product,
  currentPack,
  bundleComplement,
  includeBundleItem2,
  setIncludeBundleItem2,
  bundleAdded,
  onAddBundle,
}) {
  const complementPrice = bundleComplement?.price || 499;
  const comboTotal = includeBundleItem2
    ? currentPack.price + complementPrice - 149
    : currentPack.price;

  return (
    <section className="py-6">
      <div className="bg-linear-to-r from-emerald-50/90 via-white to-amber-50/90 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-brand-display">
              Frequently Bought Together
            </h2>
          </div>
          <span className="bg-[#C89B58] text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow-2xs">
            Save ₹149 Combo Discount
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Checkbox Items Row */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
            {/* Item 1 */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100 flex items-center gap-3 w-full sm:w-auto flex-1 shadow-2xs">
              <input type="checkbox" checked readOnly className="w-4 h-4 accent-[#13805B] rounded" />
              <img
                src={product.image}
                alt={product.title}
                className="w-14 h-14 object-contain rounded-xl"
              />
              <div className="min-w-0">
                <span className="text-xs font-black text-slate-900 block truncate">
                  {product.title}
                </span>
                <span className="text-xs font-extrabold text-[#13805B]">
                  ₹{currentPack.price}
                </span>
              </div>
            </div>

            <div className="text-slate-400 font-black text-xl shrink-0">+</div>

            {/* Item 2 with Interactive Checkbox */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100 flex items-center gap-3 w-full sm:w-auto flex-1 shadow-2xs">
              <input
                type="checkbox"
                checked={includeBundleItem2}
                onChange={(e) => setIncludeBundleItem2(e.target.checked)}
                className="w-4 h-4 accent-[#13805B] rounded cursor-pointer"
              />
              <img
                src={bundleComplement.image}
                alt={bundleComplement.title}
                className="w-14 h-14 object-contain rounded-xl"
              />
              <div className="min-w-0">
                <span className="text-xs font-black text-slate-900 block truncate">
                  {bundleComplement.title}
                </span>
                <span className="text-xs font-extrabold text-[#13805B]">
                  ₹{bundleComplement.price}
                </span>
              </div>
            </div>
          </div>

          {/* Total & 1-Click Action */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-emerald-200 flex flex-col justify-between space-y-3 shadow-2xs">
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500">Combo Total:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">₹{comboTotal}</span>
                  {includeBundleItem2 && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{currentPack.price + complementPrice}
                    </span>
                  )}
                </div>
              </div>
              {includeBundleItem2 && (
                <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                  🎉 Instant Combo Discount of ₹149 Applied!
                </span>
              )}
            </div>

            <button
              onClick={onAddBundle}
              className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              {bundleAdded ? <Check className="w-4 h-4 stroke-3" /> : <Plus className="w-4 h-4" />}
              <span>{bundleAdded ? 'ADDED BOTH TO BAG!' : 'ADD BOTH TO BAG (1-CLICK)'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
