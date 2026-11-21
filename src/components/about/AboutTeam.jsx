import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/about';

export default function AboutTeam({ teamMembers = TEAM_MEMBERS }) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <span>🎨</span> MEET THE PEOPLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The minds &amp; hearts behind <span className="text-[#1F3C24]">Nestor</span>
              <span className="text-[#C89B58]">.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              A small but passionate team of parents, doctors, food scientists and dreamers — working together for healthier, happier kids.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 border border-[#1F3C24] text-[#1F3C24] hover:bg-[#FAF4EB] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shrink-0 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={member.name || `team-${idx}`}
              className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#1F3C24]/20 shadow-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-base font-black text-slate-900 leading-tight group-hover:text-[#1F3C24] transition-colors">
                {member.name}
              </h3>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 mb-3 block">
                {member.role}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                "{member.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
