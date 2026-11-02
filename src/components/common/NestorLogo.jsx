import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Nestor Brand Logo Component
 * Provides responsive, pixel-perfect rendering for all Nestor brand asset variations.
 * 
 * Variants:
 * - 'horizontal' (Default): Balanced emblem + wordmark lockup (Best for Navbars & Headers)
 * - 'icon': Emblem only (Botanical leaf, golden wheat, star)
 * - 'stacked': Vertical stacked logo (Emblem on top, wordmark in center)
 * - 'text': Wordmark typography only ("Nestor - NOURISHING BRIGHTER TOMORROWS")
 */
export default function NestorLogo({
  variant = 'horizontal',
  className = '',
  imgClassName = '',
  linkTo = null,
  alt = 'Nestor - Nourishing Brighter Tomorrows',
  ...props
}) {
  const assetMap = {
    horizontal: '/logo-horizontal.png',
    icon: '/logo-icon.png',
    stacked: '/logo.png',
    text: '/logo-text.png'
  };

  const defaultHeightMap = {
    horizontal: 'h-9 sm:h-11 w-auto',
    icon: 'h-8 sm:h-10 w-auto',
    stacked: 'h-14 sm:h-16 w-auto',
    text: 'h-7 sm:h-8 w-auto'
  };

  const src = assetMap[variant] || assetMap.horizontal;
  const sizeClasses = defaultHeightMap[variant] || defaultHeightMap.horizontal;

  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={`object-contain select-none transition-transform duration-200 ${sizeClasses} ${imgClassName}`}
      loading="eager"
      decoding="async"
      {...props}
    />
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={`inline-flex items-center shrink-0 focus-ring rounded-lg ${className}`}>
        {imageElement}
      </Link>
    );
  }

  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      {imageElement}
    </div>
  );
}
