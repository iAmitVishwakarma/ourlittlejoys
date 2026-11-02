import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import ScallopDivider from '../common/ScallopDivider';
import NestorLogo from '../common/NestorLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[#142718] text-white pt-14 pb-24 sm:pb-28 lg:pb-10">
      {/* Scalloped organic wave top edge */}
      <div className="absolute -top-3 sm:-top-4 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <ScallopDivider variant="fill" fillColor="#142718" direction="up" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group bg-white/95 rounded-2xl px-3.5 py-1.5 shadow-sm hover:bg-white transition-all">
              <NestorLogo variant="horizontal" imgClassName="h-8 sm:h-9 w-auto" />
            </Link>

            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-md leading-relaxed mb-4">
              Nourishing Brighter Tomorrows 🌿 Pediatrician-backed clean organic nutrition crafted to support your child's physical growth, healthy immunity, and active minds. Zero refined sugars, 100% honest purity.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#EAF2E9] font-bold bg-[#1F3C24] px-3.5 py-2 rounded-full w-max border border-emerald-800/60 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#C89B58]" />
              <span>NABL Accredited &amp; 100% Lab Tested</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#C89B58] mb-3 sm:mb-4">Quick Links</p>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-emerald-100/70 font-medium">
              <li><Link to="/aboutus" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop/all" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/honest-report" className="hover:text-white transition-colors">Honest Reports</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/wallet-recharge" className="hover:text-white transition-colors">Nestor Wallet</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#C89B58] mb-3 sm:mb-4">Policies &amp; Legal</p>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-emerald-100/70 font-medium">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Parent Profile</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-emerald-900/60 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-emerald-200/60 gap-3 sm:gap-4">
          <p>© 2026 Nestor Wellness PVT LTD. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C89B58] fill-[#C89B58] inline" />
            <span>for nourishing brighter tomorrows</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
