import React from 'react';
import { ShieldCheck, Lock, RotateCcw, Heart } from 'lucide-react';

export default function CheckoutFooter() {
  return (
    <footer className="bg-white border-t border-orange-100 py-8 px-4 text-center mt-12">
      <div className="container mx-auto max-w-4xl space-y-6">
        
        {/* 3 Core Trust Assurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-bold text-slate-600">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <Lock className="w-4 h-4 text-[#13805B]" />
            <span>256-Bit Bank Grade SSL</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-[#13805B]" />
            <span>100% Genuine Nutrition</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <RotateCcw className="w-4 h-4 text-[#13805B]" />
            <span>Easy 7-Day Returns</span>
          </div>
        </div>

        {/* Brand Closing Line */}
        <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
          <span>Crafted with science &amp; parenting care</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" />
          <span>• © 2026 Little Joys. All Rights Reserved.</span>
        </p>

      </div>
    </footer>
  );
}
