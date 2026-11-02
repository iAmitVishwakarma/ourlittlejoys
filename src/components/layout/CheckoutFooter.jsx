import React from 'react';
import { ShieldCheck, Lock, RotateCcw, Heart } from 'lucide-react';

export default function CheckoutFooter() {
  return (
    <footer className="bg-white border-t border-orange-100 py-8 px-4 text-center mt-12">
      <div className="container mx-auto max-w-4xl space-y-6">
        
        {/* 3 Core Trust Assurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-bold text-slate-600">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#FAF4EB]/50 border border-[#C89B58]/20">
            <Lock className="w-4 h-4 text-[#1F3C24]" />
            <span>256-Bit Bank Grade SSL</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#FAF4EB]/50 border border-[#C89B58]/20">
            <ShieldCheck className="w-4 h-4 text-[#1F3C24]" />
            <span>100% Genuine Nutrition</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#FAF4EB]/50 border border-[#C89B58]/20">
            <RotateCcw className="w-4 h-4 text-[#1F3C24]" />
            <span>Easy 7-Day Returns</span>
          </div>
        </div>

        {/* Brand Closing Line */}
        <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
          <span>Crafted with science &amp; parenting care</span>
          <Heart className="w-3 h-3 text-[#C89B58] fill-[#C89B58] inline" />
          <span>• © 2026 Nestor. All Rights Reserved.</span>
        </p>

      </div>
    </footer>
  );
}
