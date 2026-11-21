import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Check,
  Truck,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Lock,
  RotateCcw,
} from 'lucide-react';

export default function ProductPurchasePanel({
  product,
  packVariants,
  selectedPackIndex,
  setSelectedPackIndex,
  currentPack,
  discount,
  quantity,
  setQuantity,
  addedAnimation,
  onAdd,
  onBuyNow,
  pincode,
  setPincode,
  pincodeStatus,
  onCheckPincode,
}) {
  return (
    <div className="lg:col-span-6 space-y-4">
      <div>
        {/* Category & Ratings Row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B58] bg-[#FAF4EB] px-2.5 py-0.5 rounded-full border border-[#C89B58]/30">
            {product.subCategory || product.category}
          </span>

          <a
            href="#customer-reviews"
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-200/80 transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">
              ({product.reviews || '4,680'} reviews)
            </span>
          </a>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {product.title}
        </h1>

        {/* One-Line Benefit Hook */}
        <p className="text-sm text-slate-600 mt-1 leading-relaxed font-medium">
          {product.description}
        </p>
      </div>

      {/* Price & Savings Block */}
      <div className="p-4 rounded-2xl bg-linear-to-r from-brand-cream to-orange-50/50 border border-orange-200/80 flex items-baseline justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              ₹{currentPack.price}
            </span>
            {currentPack.mrp && (
              <span className="text-base text-slate-400 line-through">
                ₹{currentPack.mrp}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-[#13805B] text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>
          <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 stroke-3" />
            <span>You save ₹{currentPack.mrp - currentPack.price} on this pack</span>
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-semibold block">
            Inclusive of all taxes
          </span>
          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 justify-end mt-0.5">
            <Truck className="w-3.5 h-3.5" /> Free Delivery
          </span>
        </div>
      </div>

      {/* Pack Size Variant Cards */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-800">
            Select Pack Size:
          </label>
          <span className="text-[11px] text-[#13805B] font-bold">100% Satisfaction Guarantee</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {packVariants.map((pack, idx) => {
            const isSelected = selectedPackIndex === idx;
            return (
              <button
                key={pack.id || pack.label || `${pack.count || 'pack'}-${idx}`}
                onClick={() => setSelectedPackIndex(idx)}
                className={`relative p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#1F3C24] bg-emerald-50/50 shadow-xs ring-2 ring-[#1F3C24]/20'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white'
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-2.5 right-2 bg-[#C89B58] text-white text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                    {pack.badge}
                  </span>
                )}

                {isSelected && (
                  <span className="absolute -top-2 left-2 bg-[#1F3C24] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5 stroke-3" /> Selected
                  </span>
                )}

                <div className="mt-0.5">
                  <span className="text-xs font-black text-slate-900 block truncate">
                    {pack.label}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {pack.desc}
                  </span>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-sm font-black text-slate-900">₹{pack.price}</span>
                  <span className="text-[10px] font-bold text-emerald-700">{pack.perDay}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wallet Cashback Promotion Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🪙</span>
          <div>
            <span className="text-xs font-black text-amber-950 block">
              Get ₹150 Cashback with Nestor Wallet
            </span>
            <span className="text-[11px] text-amber-800">
              Use your parenting balance for an instant 30% bonus.
            </span>
          </div>
        </div>
        <Link to="/wallet-recharge" className="text-xs font-black text-amber-900 underline shrink-0">
          Top Up →
        </Link>
      </div>

      {/* Quantity Stepper & Main CTAs */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#1F3C24] font-bold shadow-xs active:scale-90 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center text-sm font-black text-slate-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#1F3C24] font-bold shadow-xs active:scale-90 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onAdd}
            className={`flex-1 font-black py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 ${
              addedAnimation
                ? 'bg-[#1F3C24] text-white shadow-[#1F3C24]/30'
                : 'bg-[#1F3C24] hover:bg-[#142718] text-white shadow-[#1F3C24]/25'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 stroke-3" />
                <span>ADDED TO BAG!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={onBuyNow}
          className="w-full bg-[#C89B58] hover:bg-[#B38644] text-white font-black py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#C89B58]/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
        >
          <span>BUY NOW WITH 1-CLICK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pincode & Delivery Module */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
        <form onSubmit={onCheckPincode} className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit Pincode"
            className="flex-1 bg-white border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-[#13805B]"
          />
          <button
            type="submit"
            className="bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-black transition-colors"
          >
            CHECK
          </button>
        </form>

        {pincodeStatus.checked && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60">
            <Check className="w-3.5 h-3.5 stroke-3 text-emerald-600 shrink-0" />
            <span>
              Delivery by <strong>{pincodeStatus.deliveryDate}</strong> • Free Express Shipping
            </span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-bold text-slate-600 text-center">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#13805B]" />
            <span>100% Genuine</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#13805B]" />
            <span>Secure UPI/Cards</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <RotateCcw className="w-3.5 h-3.5 text-[#13805B]" />
            <span>Easy 7-Day Returns</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-4 gap-2 text-center pt-1 text-[11px] font-bold text-slate-700">
        <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
          <span className="text-base block">🛡️</span>
          <span className="truncate block">NABL Lab Tested</span>
        </div>
        <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
          <span className="text-base block">🍯</span>
          <span className="truncate block">0% White Sugar</span>
        </div>
        <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
          <span className="text-base block">🩺</span>
          <span className="truncate block">Doctor Approved</span>
        </div>
        <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
          <span className="text-base block">🌿</span>
          <span className="truncate block">100% Vegetarian</span>
        </div>
      </div>
    </div>
  );
}
