import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

/**
 * LittleJoys V2 Reassurance Trust Badge
 * Uses only existing, verified project claims from products.js & reports.js
 */
export default function TrustBadge({
  icon = 'shield',
  title,
  subtitle,
  className = ''
}) {
  const iconMap = {
    shield: ShieldCheck,
    sparkles: Sparkles,
    heart: HeartHandshake,
    check: CheckCircle2
  };

  const SelectedIcon = typeof icon === 'string' ? iconMap[icon] || ShieldCheck : icon;

  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-brand-border shadow-2xs ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-[#F2F7F2] text-[#1F3C24] flex items-center justify-center shrink-0 border border-[#DDECDD]">
        <SelectedIcon className="w-5 h-5" />
      </div>
      <div className="text-left">
        <p className="text-xs font-black text-slate-800 leading-snug">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-500 font-medium leading-tight">{subtitle}</p>}
      </div>
    </div>
  );
}
