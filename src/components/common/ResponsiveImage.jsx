import React, { useState } from 'react';

/**
 * High-Performance Responsive Image Component
 * Optimizes Unsplash imagery by automatically injecting:
 * - WebP compression (&auto=format&fit=crop&fm=webp&q=75)
 * - Dynamic responsive srcSet (320w, 640w, 960w, 1200w)
 * - Layout shift prevention via explicit width & height attributes
 * - Prioritized or lazy loading based on viewport criticality
 */

function buildUnsplashUrl(baseUrl, width, quality = 75) {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('w', width.toString());
    return url.toString();
  } catch {
    // If not a valid full URL, append directly
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}auto=format&fit=crop&fm=webp&q=${quality}&w=${width}`;
  }
}

export default function ResponsiveImage({
  src,
  alt = "Little Joys Product",
  width = 400,
  height = 400,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  quality = 75,
  fallbackSrc = null,
  onLoad,
  style = {},
  ...rest
}) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) return null;

  const isUnsplash = typeof src === 'string' && src.includes('unsplash.com');

  // If Unsplash, build responsive srcset and optimized src
  let finalSrc = src;
  let srcSet = undefined;

  if (isUnsplash && !imgError) {
    finalSrc = buildUnsplashUrl(src, width, quality);
    const widths = [320, 640, 960, 1200];
    srcSet = widths
      .map((w) => `${buildUnsplashUrl(src, w, quality)} ${w}w`)
      .join(', ');
  } else if (imgError && fallbackSrc) {
    finalSrc = fallbackSrc;
  }

  return (
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      onError={() => setImgError(true)}
      onLoad={(e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
      }}
      className={`${!isLoaded ? 'skeleton-shimmer' : ''} ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        ...style
      }}
      {...rest}
    />
  );
}
