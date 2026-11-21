import React from 'react';
import { Check, ShoppingBag } from 'lucide-react';

export default function ProductStickyBars({
  showStickyBar,
  product,
  currentPack,
  addedAnimation,
  onAdd,
}) {
  if (!showStickyBar) return null;

  return (
    <>
      {/* Desktop Sticky Bar (Top) */}
      <div className="hidden md:block fixed top-18.5 md:top-20.5 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-md py-2.5 px-4 animate-in slide-in-from-top duration-300">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={product.image}
              alt={product.title}
              width={44}
              height={44}
              className="w-11 h-11 object-cover rounded-xl border border-orange-100 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {product.title}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-extrabold text-[#13805B]">₹{currentPack.price}</span>
                <span>•</span>
                <span>{currentPack.label}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onAdd}
              className="bg-[#13805B] hover:bg-[#0E6346] text-white text-xs font-black px-7 py-2.5 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              {addedAnimation ? <Check className="w-4 h-4 stroke-3" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{addedAnimation ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar (Fixed Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-3 px-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">₹{currentPack.price}</span>
            {currentPack.mrp && (
              <span className="text-xs text-slate-400 line-through">₹{currentPack.mrp}</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block truncate max-w-35">
            {currentPack.label}
          </span>
        </div>

        <button
          onClick={onAdd}
          className="bg-[#13805B] active:bg-[#0E6346] text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-lg shadow-[#13805B]/30 flex items-center gap-1.5 shrink-0"
        >
          {addedAnimation ? <Check className="w-4 h-4 stroke-3" /> : <ShoppingBag className="w-4 h-4" />}
          <span>{addedAnimation ? 'ADDED!' : 'ADD TO BAG'}</span>
        </button>
      </div>
    </>
  );
}
