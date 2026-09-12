import React, { useState } from 'react';

/**
 * Photographic Product Visual component displaying real high-definition product imagery
 * (Unsplash real photography & clean e-commerce product photos).
 * Completely replaces synthetic SVG vector drawings with authentic imagery.
 */
const DEFAULT_REAL_IMAGES = {
  nutrimix: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=380&q=75",
  gummies: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=380&q=75",
  combo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=380&q=75",
  kit: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=380&q=75",
  sauce: "https://images.unsplash.com/photo-1587830605990-eb887f8f902a?auto=format&fit=crop&w=380&q=75",
  spread: "https://images.unsplash.com/photo-1587830605990-eb887f8f902a?auto=format&fit=crop&w=380&q=75",
  cereal: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=380&q=75",
  proteinmix: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=380&q=75",
  electrolyte: "https://images.unsplash.com/photo-1622484216805-4c07914e6e66?auto=format&fit=crop&w=380&q=75",
  toothpaste: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=380&q=75",
  default: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=380&q=75"
};

export default function ProductVisual({
  image = null,
  type = 'nutrimix',
  flavor = 'chocolate',
  age = '4+',
  alt = 'Little Joys Product',
  className = '',
  ischeckedPage = false
}) {
  const [imgError, setImgError] = useState(false);

  // Determine source image: direct image prop > type mapped photo > default photo
  const resolvedSrc = (!imgError && image) 
    ? image 
    : (DEFAULT_REAL_IMAGES[type] || DEFAULT_REAL_IMAGES.default);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden p-1 group ${className}`}>
      {/* Real Product Photography Poster */}
      <img
        src={resolvedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="300"
        height="300"
        onError={() => setImgError(true)}
        className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
