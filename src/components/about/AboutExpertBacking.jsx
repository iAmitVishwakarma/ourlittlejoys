import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeartDoodle } from '@/components/graphics/KidsDoodles';
import { EXPERT_BADGES } from '@/data/about';

export default function AboutExpertBacking({ expertBadges = EXPERT_BADGES }) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <span>🛡️</span> BACKED BY EXPERTS
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight font-brand-display">
              Nutrition you can <span className="text-brand-forest">trust</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our products are thoughtfully formulated with the guidance of pediatricians, nutritionists and food scientists. Every ingredient is chosen for a reason, every recipe is tested for safety, taste and real nutritional value.
            </p>

            <div className="pt-2">
              <Link
                to="/honest-report"
                className="inline-flex items-center gap-2 border-2 border-brand-forest hover:bg-[#FAF4EB] text-brand-forest font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                <span>See Our Honest Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex justify-center">
            <div className="w-56 sm:w-64 rounded-3xl overflow-hidden border-2 border-orange-100 shadow-lg bg-white relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
                alt="Dr. Mehta, Pediatrician"
                className="w-full h-64 object-cover object-top"
              />
              <div className="p-4 bg-white border-t border-slate-100">
                <p className="italic text-xs text-slate-700 font-semibold leading-relaxed">
                  "Good food today for a stronger tomorrow"
                </p>
                <p className="text-brand-forest text-xs font-black mt-1">
                  — Dr. Mehta, <span className="text-slate-500 font-medium">Pediatrician</span>
                </p>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3">
              <HeartDoodle className="w-6 h-6 text-[#C89B58] rotate-[-10deg]" />
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {expertBadges.map((badge, idx) => (
              <div
                key={badge.label || `badge-${idx}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-2xs text-xs font-black ${badge.bg}`}
              >
                <span className="text-base">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
