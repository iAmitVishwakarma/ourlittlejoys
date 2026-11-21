import React from 'react';
import {
  SunDoodle,
  MiniStarCluster,
  FlyingKidDoodle,
} from '@/components/graphics/KidsDoodles';

export default function ProductDailyRoutine() {
  return (
    <section className="py-6">
      <div className="relative text-center bg-linear-to-b from-amber-50/70 via-white to-orange-50/40 rounded-3xl p-6 sm:p-8 border border-orange-200/80 mb-6 shadow-xs overflow-hidden">
        {/* Playful Floating Sun & Stars */}
        <SunDoodle className="w-9 h-9 text-amber-400 absolute top-4 left-6 hidden sm:block animate-pulse" />
        <MiniStarCluster className="text-amber-400 absolute top-5 right-8 hidden sm:inline-flex" />

        {/* Rainbow Whimsical Heading */}
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-sans select-none mb-1">
          <span className="text-sky-500 inline-block hover:scale-110 transition-transform">H</span>
          <span className="text-sky-600 inline-block hover:scale-110 transition-transform">E</span>
          <span className="text-indigo-500 inline-block hover:scale-110 transition-transform">A</span>
          <span className="text-indigo-600 inline-block hover:scale-110 transition-transform">L</span>
          <span className="text-emerald-500 inline-block hover:scale-110 transition-transform">T</span>
          <span className="text-emerald-600 inline-block hover:scale-110 transition-transform">H</span>
          <span className="text-emerald-700 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">Y</span>

          <span className="text-amber-500 inline-block hover:scale-110 transition-transform">H</span>
          <span className="text-amber-600 inline-block hover:scale-110 transition-transform">A</span>
          <span className="text-orange-500 inline-block hover:scale-110 transition-transform">B</span>
          <span className="text-orange-600 inline-block hover:scale-110 transition-transform">I</span>
          <span className="text-rose-500 inline-block hover:scale-110 transition-transform">T</span>
          <span className="text-rose-600 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">S</span>

          <span className="text-yellow-500 inline-block hover:scale-110 transition-transform">S</span>
          <span className="text-amber-500 inline-block hover:scale-110 transition-transform">T</span>
          <span className="text-orange-500 inline-block hover:scale-110 transition-transform">A</span>
          <span className="text-rose-500 inline-block hover:scale-110 transition-transform">R</span>
          <span className="text-emerald-600 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">T</span>

          <span className="text-rose-600 inline-block hover:scale-110 transition-transform">H</span>
          <span className="text-[#C89B58] inline-block hover:scale-110 transition-transform">E</span>
          <span className="text-purple-600 inline-block hover:scale-110 transition-transform">R</span>
          <span className="text-red-500 inline-block hover:scale-110 transition-transform">E</span>
          <span className="text-red-600 inline-block hover:scale-110 transition-transform">...</span>
        </h2>

        {/* Flying Kid Superhero Doodle */}
        <div className="flex justify-center -my-2">
          <FlyingKidDoodle className="w-48 sm:w-64 h-20 sm:h-24 drop-shadow-xs" />
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed -mt-1">
          Build a joyful morning nutrition habit that kids remind you for every single day!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#13805B] font-black text-sm flex items-center justify-center mx-auto">
            1
          </div>
          <h4 className="text-base font-black text-slate-900">Scoop</h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Take 2 level scoops (approx. 30g) of Nutrimix powder.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mx-auto">
            2
          </div>
          <h4 className="text-base font-black text-slate-900">Pour</h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Add to 150ml-200ml of warm or chilled milk (or smoothies).
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#1F3C24] transition-all">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#C89B58] font-black text-sm flex items-center justify-center mx-auto">
            3
          </div>
          <h4 className="text-base font-black text-slate-900">Shake / Stir</h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Stir vigorously or shake in tumbler for 10 seconds.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mx-auto">
            4
          </div>
          <h4 className="text-base font-black text-slate-900">Enjoy Daily</h4>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Serve once daily with breakfast or evening snack.
          </p>
        </div>
      </div>
    </section>
  );
}
