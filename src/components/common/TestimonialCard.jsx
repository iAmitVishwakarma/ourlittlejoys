import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialCard({
  testimonial,
  title,
  quote,
  review,
  author,
  parentName,
  child,
  childAge,
  location,
  rating = 5,
  avatar,
  verified = true
}) {
  const data = testimonial || {};
  const cardTitle = data.title || title || "Wholesome & Loved";
  const cardQuote = data.quote || data.review || quote || review || "";
  const cardAuthor = data.author || data.parentName || author || parentName || "Verified Parent";
  const cardChild = data.child || (data.childAge ? `Parent of child (${data.childAge})` : child || (childAge ? `Parent of child (${childAge})` : "Parent"));
  const cardLocation = data.location || location || "";
  const cardAvatar = data.avatar || avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80";
  const cardRating = data.rating || rating || 5;

  return (
    <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm flex flex-col justify-between w-full h-full hover:shadow-md transition-shadow">
      <div className="space-y-3 mb-6">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400" aria-label={`${cardRating} out of 5 stars`}>
          {[...Array(cardRating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <h3 className="text-base font-bold text-slate-900 leading-snug">
          "{cardTitle}"
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {cardQuote}
        </p>
      </div>

      {/* Author & Verification Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={cardAvatar}
            alt={cardAuthor}
            className="w-10 h-10 bg-amber-50 rounded-full object-cover shrink-0 border border-slate-100"
            loading="lazy"
          />
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
              {cardAuthor}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block truncate">
              {cardChild} {cardLocation ? `• ${cardLocation}` : ''}
            </span>
          </div>
        </div>

        {verified && (
          <span className="text-[10px] font-bold text-[#13805B] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 ml-2">
            Verified
          </span>
        )}
      </div>
    </div>
  );
}