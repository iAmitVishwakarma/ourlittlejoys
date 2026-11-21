import React from 'react';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { Heart } from 'lucide-react';

export default function ProductGallery({
  product,
  galleryImages,
  selectedThumbnail,
  setSelectedThumbnail,
  isFavorite,
  onToggleWishlist,
}) {
  return (
    <div className="lg:col-span-6 flex flex-col items-center">
      {/* Big Main Image Showcase */}
      <div className="relative w-full aspect-square max-w-md bg-linear-to-tr from-brand-cream via-white to-amber-50/40 rounded-3xl p-6 flex items-center justify-center border border-orange-100 shadow-inner overflow-hidden group">
        <ResponsiveImage
          src={galleryImages[selectedThumbnail]}
          alt={product.title}
          width={420}
          height={420}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          sizes="(max-width: 640px) 320px, 420px"
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.tag && (
            <span className="bg-[#C89B58] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              {product.tag}
            </span>
          )}
          <span className="bg-[#1F3C24] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
            NABL Tested
          </span>
        </div>

        {/* Top Right: Age Pill & Wishlist Button */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase">
            {product.age || '4+ Yr'}
          </span>
          <button
            type="button"
            onClick={onToggleWishlist}
            aria-label={isFavorite ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer ${
              isFavorite
                ? 'bg-red-500 text-white shadow-md scale-105'
                : 'bg-white/95 text-slate-400 hover:text-red-500 hover:bg-white'
            }`}
            title={isFavorite ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-white text-white' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-4 gap-2.5 w-full max-w-md mt-3.5">
        {galleryImages.map((imgSrc, idx) => (
          <button
            key={`${imgSrc}-${idx}`}
            onClick={() => setSelectedThumbnail(idx)}
            className={`aspect-square rounded-2xl overflow-hidden p-1 border-2 transition-all ${
              selectedThumbnail === idx
                ? 'border-[#1F3C24] shadow-sm scale-102 bg-emerald-50/40'
                : 'border-slate-100 hover:border-slate-300 bg-white opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={imgSrc}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
