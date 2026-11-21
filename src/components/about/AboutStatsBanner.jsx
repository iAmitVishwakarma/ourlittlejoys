import React from 'react';
import { HeartDoodle } from '@/components/graphics/KidsDoodles';

export default function AboutStatsBanner() {
  return (
    <section className="container mx-auto max-w-5xl px-4 sm:px-6 my-6">
      <div className="bg-[#FAF4EB] border border-[#C89B58]/30 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-30 pointer-events-none">
          <HeartDoodle className="w-24 h-24 text-[#C89B58]/40" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-center md:text-left">
          <div className="text-center">
            <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">200K+</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Happy Families</p>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">🥣</div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">2M+</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Healthy Servings</p>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">4.8/5</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Parent Rating</p>
          </div>

          <div className="text-center">
            <div className="text-2xl mb-1">💖</div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">100%</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Love &amp; Trust</p>
          </div>

          <div className="col-span-2 md:col-span-1 text-center md:text-right flex flex-col items-center md:items-end justify-center">
            <span className="font-handwriting text-sm sm:text-base font-extrabold text-slate-700 italic leading-snug">
              Real Families. <br />
              Real Stories. <br />
              Real Impact. 💖
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
