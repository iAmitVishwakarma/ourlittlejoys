import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import ScallopDivider from '../common/ScallopDivider';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-14 pb-24 sm:pb-28 lg:pb-10">
      {/* Scalloped organic wave top edge */}
      <div className="absolute -top-3 sm:-top-4 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <ScallopDivider variant="fill" fillColor="#0f172a" direction="up" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <span className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-brand-berry transition-colors">
                little<span className="text-brand-berry">joys</span>
              </span>
              <span className="text-2xl">🍓</span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed mb-4">
              Life is full of little joys ✨ Made with love for tiny tummies &amp; big smiles. We craft clean, pediatrician-backed nutrition to support your child's physical growth and sharp minds.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-slate-800/80 px-3.5 py-2 rounded-full w-max border border-slate-700/60">
              <ShieldCheck className="w-4 h-4" />
              <span>NABL Accredited Third-Party Tested</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand-berry mb-3 sm:mb-4">Quick Links</p>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              <li><Link to="/aboutus" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop/all" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/honest-report" className="hover:text-white transition-colors">Honest Reports</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/wallet-recharge" className="hover:text-white transition-colors">LJ Wallet</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-brand-berry mb-3 sm:mb-4">Policies &amp; Legal</p>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Parent Profile</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-slate-400 gap-3 sm:gap-4">
          <p>© 2020-2026 Little Joys by Mosaic Wellness PVT LTD. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand-berry fill-brand-berry inline" />
            <span>for growing little champions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
