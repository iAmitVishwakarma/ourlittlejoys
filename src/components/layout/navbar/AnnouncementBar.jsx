import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Smartphone } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 499;

export default function AnnouncementBar({ effectiveCartCount, cartTotal }) {
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="bg-gradient-to-r from-[#142718] via-[#1F3C24] to-[#2A5232] text-white text-xs font-semibold py-2 px-3 sm:px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {effectiveCartCount > 0 && shippingRemaining > 0 ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">
                Add <strong>₹{shippingRemaining}</strong> more for <strong>FREE Shipping!</strong>
              </span>
              <div className="hidden sm:flex items-center gap-1 shrink-0">
                <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-black">{Math.round(shippingProgress)}%</span>
              </div>
            </div>
          ) : effectiveCartCount > 0 && shippingRemaining <= 0 ? (
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs font-black">🎉 You've unlocked FREE Shipping!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase shrink-0">
                Save 30%
              </span>
              <span className="truncate text-[11px] sm:text-xs">
                Use <strong>Nestor Wallet</strong> &amp; Save Upto 30%
              </span>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-wide shrink-0">
          <Link to="/honest-report" className="hover:underline flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Honest Reports
          </Link>
          <span className="opacity-40">|</span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline">
            <Smartphone className="w-3.5 h-3.5" /> Download APP
          </span>
        </div>
      </div>
    </div>
  );
}
