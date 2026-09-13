import React, { useState } from 'react';
import { useCartDerived } from '@/stores/cartStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { ShieldCheck, Truck, ChevronDown, Tag } from 'lucide-react';

export default function CheckoutOrderSummary({ showItemsList = true }) {
  const { cartItems, mrpTotal, mrpSavings, couponDiscount, appliedCoupon, deliveryFee, totalPayable } = useCartDerived();
  const { useWalletBalance, walletBalance } = useCheckoutStore();

  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Calculate final payable considering wallet if applied
  const walletDeduction = useWalletBalance ? Math.min(walletBalance, totalPayable) : 0;
  const finalPayable = Math.max(0, totalPayable - walletDeduction);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-sm space-y-4">
      {/* Header */}
      <div 
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="flex items-center justify-between cursor-pointer md:cursor-default"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">
            Order Summary
          </h3>
          <span className="bg-emerald-100 text-[#13805B] text-[11px] font-black px-2 py-0.5 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* Mobile accordion toggle */}
        <div className="flex items-center gap-1 md:hidden text-xs font-bold text-slate-500">
          <span>₹{finalPayable}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isMobileExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Collapsible content on mobile, visible on desktop */}
      <div className={`space-y-4 ${isMobileExpanded ? 'block' : 'hidden md:block'}`}>
        
        {/* Items Mini List */}
        {showItemsList && cartItems.length > 0 && (
          <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id || item.slug} className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-xl object-contain bg-orange-50/50 p-1 border border-orange-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>Qty: {item.quantity}</span>
                    {item.weight && <span>• {item.weight}</span>}
                  </div>
                </div>
                <span className="text-xs font-black text-slate-900 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Applied Coupon Callout */}
        {appliedCoupon && (
          <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Coupon <strong>{appliedCoupon.code}</strong> Applied</span>
            </div>
            <span className="font-black text-emerald-700">-₹{couponDiscount}</span>
          </div>
        )}

        {/* Bill Breakdown */}
        <div className="space-y-2 text-xs sm:text-sm pt-2 border-t border-slate-100">
          <div className="flex justify-between text-slate-600">
            <span>Bag MRP Total</span>
            <span className="font-bold text-slate-900">₹{mrpTotal}</span>
          </div>

          <div className="flex justify-between text-emerald-600">
            <span>Product Discount</span>
            <span className="font-bold">- ₹{mrpSavings}</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Coupon Savings</span>
              <span className="font-bold">- ₹{couponDiscount}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            {deliveryFee === 0 ? (
              <span className="font-black text-emerald-700 uppercase tracking-wider text-xs">
                FREE
              </span>
            ) : (
              <span className="font-bold text-slate-900">₹{deliveryFee}</span>
            )}
          </div>

          {useWalletBalance && walletDeduction > 0 && (
            <div className="flex justify-between text-[#FF2F92] font-bold">
              <span>LJ Wallet Balance</span>
              <span>- ₹{walletDeduction}</span>
            </div>
          )}

          <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
            <div>
              <span className="text-sm sm:text-base font-black text-slate-900">Total Amount</span>
              <p className="text-[10px] text-slate-400">Inclusive of all taxes</p>
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              ₹{finalPayable}
            </span>
          </div>
        </div>

        {/* Total Savings Pill */}
        {mrpSavings + couponDiscount > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
            <p className="text-xs font-black text-emerald-800">
              🎉 You are saving ₹{mrpSavings + couponDiscount} on this order!
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 font-bold border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#13805B]" />
            <span>Doctor Formulated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#13805B]" />
            <span>Express Dispatch</span>
          </div>
        </div>

      </div>
    </div>
  );
}
