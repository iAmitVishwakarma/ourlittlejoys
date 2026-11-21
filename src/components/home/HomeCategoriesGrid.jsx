import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MiniStarCluster, SunDoodle } from '@/components/graphics/KidsDoodles';
import { HOME_CATEGORIES } from '@/data/categories';

export default function HomeCategoriesGrid() {
  return (
    <section className="py-6 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-primary tracking-wider">
                Discover By Need
              </span>
              <MiniStarCluster className="text-amber-400" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-3xl font-black text-slate-900 mt-0.5 flex items-center gap-1.5 sm:gap-2">
              <span>Explore Our Categories</span>
              <SunDoodle className="w-6 h-6 text-amber-400 inline-block -mt-1" />
            </h2>
          </div>
          <Link
            to="/shop/all"
            className="text-[11px] sm:text-xs font-black text-brand-primary hover:underline flex items-center gap-1 bg-white px-2.5 sm:px-3.5 py-1.5 rounded-full border border-orange-100 shadow-2xs"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Uniform Category Cards with Custom Vector SVGs */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
          {HOME_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.link}
                className={`relative rounded-3xl p-3 sm:p-3.5 text-center border transition-all duration-300 group flex flex-col justify-between items-center h-full shadow-2xs hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden ${cat.bg}`}
              >
                {cat.badge && (
                  <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-brand-berry text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                    {cat.badge}
                  </span>
                )}

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-1.5 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-xs">
                  <Icon className="w-full h-full" />
                </div>

                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] sm:text-xs md:text-sm font-black text-slate-900 block group-hover:text-brand-primary transition-colors leading-tight truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block truncate">
                    {cat.subtitle}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
