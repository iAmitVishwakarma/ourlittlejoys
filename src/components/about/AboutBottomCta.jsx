import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SunDoodle, StrongBoyDoodle } from '@/components/graphics/KidsDoodles';

export default function AboutBottomCta() {
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 my-16">
      <div className="bg-[#FFFBEB] border-2 flex justify-end items-center border-amber-200/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="hidden lg:flex flex-col scale-200 -rotate-20 items-center absolute left-8 top-1/5 text-center">
          <SunDoodle className="w-10 h-10 translate-x-14 translate-y-7 text-amber-400 mb-1 animate-spin duration-3000" />
          <span className="font-handwriting text-center text-sm font-extrabold text-slate-700 italic leading-snug">
            Little <br />
            Steps <br />
            Big <br />
            Futures 💖
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 md:pl-16 lg:pl-28 text-center space-y-1">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Join our journey <br className="hidden sm:inline" />
              towards a <span className="text-[#C89B58]">healthier</span> generation
            </h2>

            <p className="text-slate-600 text-sm sm:text-base text-center font-medium">
              Discover products made with care, for <br /> the people who matter most.
            </p>

            <div className="pt-5">
              <Link
                to="/shop/all"
                className="inline-flex items-center gap-2 bg-[#1F3C24] hover:bg-[#142718] text-white font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-[#1F3C24]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 flex md:justify-end gap-3">
            <StrongBoyDoodle className="w-36 h-36 md:translate-y-20 md:translate-x-5 md:scale-150 sm:w-44 sm:h-44 shrink-0" />
            <div className="text-left hidden sm:block">
              <span className="font-handwriting text-sm font-extrabold text-slate-700 italic leading-snug block">
                Stronger <br />
                Smarter <br />
                Happier 💖
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
