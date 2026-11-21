import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Phone, Mail, Wallet, ArrowRight } from 'lucide-react';
import ChildCharacterIllustration from '@/components/graphics/ChildCharacterIllustration';
import { HeartDoodle, SunDoodle, MiniStarCluster } from '@/components/graphics/KidsDoodles';

export default function ProfileHeaderBanner({
  currentUserName,
  currentUserPhone,
  currentUserEmail,
  currentChildName,
  currentChildAge,
  currentWalletBalance,
  initialLetter,
}) {
  return (
    <section
      className="relative bg-linear-to-r from-[#FFF4EE] via-brand-cream to-[#FFF6E9] rounded-3xl p-6 sm:p-7 md:p-8 border border-orange-100/90 shadow-xs overflow-hidden"
      aria-label="Parent welcome banner"
    >
      <div className="absolute top-2 left-4 text-orange-200/50 pointer-events-none">
        <SunDoodle className="w-8 h-8" />
      </div>
      <div className="absolute bottom-2 right-1/3 text-emerald-200/40 pointer-events-none hidden md:block">
        <MiniStarCluster className="text-emerald-400" />
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 relative z-10">
        {/* Left Parent & Child Info + Illustration */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-tr from-[#1F3C24] via-[#2A5232] to-[#C89B58] text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md shadow-[#1F3C24]/20 border-3 border-white shrink-0"
            aria-label="Parent avatar"
          >
            {initialLetter}
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs sm:text-sm font-bold text-slate-500">Hello,</span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate font-brand-display">
                {currentUserName}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-[#FAF4EB] text-[#1F3C24] px-2.5 py-0.5 rounded-full border border-[#C89B58]/30">
                <Check className="w-3 h-3 stroke-3 text-[#1F3C24]" />
                <span>Verified Parent</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {currentUserPhone}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 text-slate-400" />
                {currentUserEmail}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F3C24] bg-[#FAF4EB] px-3 py-1 rounded-full border border-[#C89B58]/30">
                <span>👦</span>
                <span>
                  Parent of {currentChildName} ({currentChildAge} Years Old)
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold text-slate-600">
                <span>Nourishing Brighter Tomorrows</span>
                <HeartDoodle className="w-3.5 h-3.5 text-[#C89B58] inline-block" />
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center shrink-0 pr-2">
            <ChildCharacterIllustration className="w-24 h-24 lg:w-28 lg:h-28 drop-shadow-xs" />
          </div>
        </div>

        {/* Right Side: LJ Wallet Balance Card */}
        <div className="w-full lg:w-72 bg-[#FFFBEB] border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 text-lg shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider block">
                NESTOR WALLET
              </span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                ₹{currentWalletBalance}
              </span>
            </div>
          </div>

          <Link
            to="/wallet"
            className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-transform active:scale-98 flex items-center justify-center gap-1.5"
          >
            <span>Recharge &amp; Get 30% Extra</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
