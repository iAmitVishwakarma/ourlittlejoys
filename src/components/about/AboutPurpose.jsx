import React from 'react';
import ScallopDivider from '@/components/common/ScallopDivider';
import { WavyUnderline } from '@/components/graphics/KidsDoodles';
import { PURPOSE_CARDS } from '@/data/about';

export default function AboutPurpose() {
  return (
    <section className="relative bg-[#EDFAF4] shadow-xl py-16 sm:py-20 my-10">
      <div className="absolute -top-3.5 sm:-top-5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <ScallopDivider variant="fill" fillColor="#EDFAF4" direction="up" />
      </div>
      <div className="absolute -bottom-3.5 sm:-bottom-5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <ScallopDivider variant="fill" fillColor="#EDFAF4" direction="down" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
          <span>🌿</span> OUR PURPOSE
        </div>

        <div className="inline-block relative mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Healthier Children. Happier Tomorrows.
          </h2>
          <div className="w-48 sm:w-64 mx-auto mt-2">
            <WavyUnderline className="text-amber-400 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {PURPOSE_CARDS.map(({ id, title, description, emoji, badgeColor, borderColor }) => (
            <div
              key={id}
              className={`backdrop-blur-xs p-6 rounded-3xl border ${borderColor} shadow-xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full bg-white/60`}
            >
              <div>
                <div className={`w-14 h-14 mx-auto rounded-2xl ${badgeColor} border flex items-center justify-center text-2xl mb-4`}>
                  {emoji}
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
