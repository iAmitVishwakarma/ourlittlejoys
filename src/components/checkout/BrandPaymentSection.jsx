import React from 'react';
import { PAYMENT_PARTNERS } from '../graphics/PaymentLogos';
import { FlyingKidDoodle, SunDoodle } from '../graphics/KidsDoodles';
import ScallopDivider from '../common/ScallopDivider';

export default function BrandPaymentSection() {
  return (
    <section className="relative bg-white pt-10 pb-16 overflow-hidden">
      {/* 1. Payment Options Strip */}
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <p className="text-xs sm:text-sm font-bold text-slate-600 mb-5 tracking-wide">
          Complete your payment using any of these payment options
        </p>

        {/* 8 Payment Badges Grid / Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {PAYMENT_PARTNERS.map((partner) => {
            const Logo = partner.Component;
            return (
              <div
                key={partner.id}
                title={partner.name}
                className="bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex items-center justify-center h-10 sm:h-11 min-w-[62px] sm:min-w-[76px]"
              >
                <Logo className="h-5 sm:h-6 w-auto max-w-[56px] sm:max-w-[64px]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Soft Wavy Divider Transition */}
      <div className="container mx-auto max-w-6xl px-4 my-10 sm:my-14">
        <ScallopDivider
          direction="up"
          color="text-slate-200/80"
          centerBadge={
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#13805B] px-3.5 py-1 rounded-full text-[11px] font-black tracking-wider uppercase border border-emerald-200/70 shadow-2xs">
              <span>100% Safe & Encrypted</span>
            </div>
          }
        />
      </div>

      {/* 3. "Life is full of little joys..." Brand Signature + SVG Boy Illustration */}
      <div className="container mx-auto max-w-5xl px-4 text-center relative">
        {/* Playful Floating SVG Superhero Boy */}
        <div className="flex justify-center items-center -mb-4 sm:-mb-6 relative z-10">
          <div className="relative group cursor-pointer">
            <FlyingKidDoodle className="w-48 sm:w-64 md:w-76 h-20 sm:h-28 drop-shadow-sm group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300" />
            <div className="absolute -top-3 -right-3 sm:-right-6">
              <SunDoodle className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Large Signature Typographic Header */}
        <div className="relative select-none">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-700 leading-tight">
            Life is full of
            <br />
            <span className="text-[#13805B] font-black">little joys...</span>
          </h2>
        </div>

        {/* Origin Signature */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-slate-600">
          <span>Crafted with</span>
          <span className="text-red-500 animate-pulse text-lg leading-none">❤️</span>
          <span>in Thane, India</span>
        </div>
      </div>
    </section>
  );
}
