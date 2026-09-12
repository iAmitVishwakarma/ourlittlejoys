import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';

export default function TestimonialCard({ title, review, parentName = "Verified Parent", childAge = "Age 6", rating = 5, avatar = "👩" }) {
  return (
    <div className="bg-white rounded-3xl p-7 relative overflow-hidden group border border-orange-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-pink-200/50 group-hover:text-pink-300 transition-colors" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-3 pr-10 leading-snug">
          "{title}"
        </h3>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
          {review}
        </p>
        
        {/* Author Details */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-pink-50 rounded-full border border-pink-100">{avatar}</span>
            <div>
              <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <span>{parentName}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
              </div>
              <div className="text-xs text-slate-400 font-medium">Mom of child, {childAge}</div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
