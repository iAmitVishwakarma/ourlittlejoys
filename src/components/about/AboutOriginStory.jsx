import React from 'react';
import { HeartDoodle } from '@/components/graphics/KidsDoodles';

export default function AboutOriginStory() {
  return (
    <section id="from-home-to-yours" className="py-16 md:py-24 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 relative flex justify-center">
            <div
              className="w-72 sm:w-96 h-80 sm:h-[420px] relative bg-amber-50 shadow-xl overflow-hidden"
              style={{
                clipPath: 'path("M 40,0 C 250,-20 380,30 360,200 C 340,350 220,420 80,390 C -20,360 -10,120 40,0 Z")',
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOyChHzf_X4eX3uPhs36SqthQxno1LQH-9N82Z1U5IQ&s=10"
                alt="Mother loving her daughter"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-4 right-2 sm:-right-4 bg-[#FEF08A] border-2 border-amber-300 px-4 py-3 rounded-2xl shadow-lg text-amber-950 font-bold text-xs sm:text-sm max-w-[190px] rotate-[3deg] z-10 leading-snug">
              <span>"it started like every parent's worry…"</span>
            </div>

            <div className="absolute -top-3 left-4">
              <HeartDoodle className="w-7 h-7 text-[#C89B58] rotate-[-12deg]" />
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <span>🌱</span> WHY WE STARTED
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight font-brand-display">
              From our <span className="text-brand-forest">home</span> to{' '}
              <span className="text-[#C89B58]">yours</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Like many parents, we struggled to find truly healthy, tasty and transparent food options for our child. Most products were either full of refined sugar, artificial ingredients, or just didn't taste good.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              So we decided to do something about it — to create a new generation of kids' nutrition that is clean, delicious, and backed by science.
            </p>

            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-orange-200/70 shadow-xs flex items-center gap-4 text-slate-800 text-sm font-semibold mt-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center shrink-0 text-xl text-emerald-700">
                🌱
              </div>
              <p className="leading-relaxed">
                What began in our kitchen is now a growing community of{' '}
                <strong className="text-slate-900 font-extrabold">200,000+ happy families</strong> across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
