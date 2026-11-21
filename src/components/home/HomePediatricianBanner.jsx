import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const PediatricDoctorIllustration = React.lazy(
  () => import('@/components/graphics/PediatricDoctorIllustration')
);

export default function HomePediatricianBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950/60 text-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Column: Assessment Copy & CTAs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-primary/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border border-brand-primary/40 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Takes Only 2 Minutes • 100% Free</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-[2.6rem] font-black leading-tight text-white tracking-tight">
                Not sure what nutrition your child is missing?
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
                Take our 2-minute{' '}
                <strong className="text-emerald-400 font-black">
                  Doctor-Backed Pediatric Health Assessment
                </strong>{' '}
                to receive a tailored daily nutrition roadmap calibrated to your child's age, growth
                milestones, and eating habits.
              </p>

              {/* 3 Evidence Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>100% ICMR Dosages</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>Personalized Roadmap</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span>Pediatrician Approved</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => navigate('/shop/all')}
                  className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-black py-3.5 sm:py-4 px-7 sm:px-9 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-brand-primary/35 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 min-h-11"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="text-xs text-slate-400 font-semibold">
                  ★ 4.9/5 by 25,000+ Indian Parents
                </span>
              </div>
            </div>

            {/* Right Column Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
              <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none -z-10" />

              <React.Suspense
                fallback={
                  <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-64 skeleton-shimmer rounded-3xl" />
                }
              >
                <PediatricDoctorIllustration className="w-full max-w-xs sm:max-w-sm lg:max-w-md drop-shadow-2xl hover:scale-120 scale-118 md:translate-y-10 md:translate-x-1 transition-transform duration-500" />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
