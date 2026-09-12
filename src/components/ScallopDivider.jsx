import React, { useId } from 'react';

/**
 * Playful Scalloped / Wavy Section Divider matching Our Little Joys children aesthetic.
 * Renders seamless repeating arches (⌒⌒⌒) or wavy filled section transitions.
 */
export default function ScallopDivider({
  variant = 'line', // 'line' | 'fill' | 'waves'
  color = 'text-orange-200/80',
  fillColor = '#FFF9F5',
  bgFill = 'transparent',
  strokeWidth = 1.75,
  direction = 'up', // 'up' (⌒⌒⌒) or 'down' (︶︶︶)
  className = '',
  centerBadge = null // optional JSX element or icon in center
}) {
  const reactId = useId();
  const safeId = `scallop-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  if (variant === 'fill') {
    // Solid scalloped transition between two background colors
    const isUp = direction === 'up';
    return (
      <div className={`relative w-full overflow-hidden leading-none z-10 pointer-events-none ${className}`}>
        <svg
          className="w-full h-4 sm:h-5 md:h-6 block"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id={safeId}
              x="0"
              y="0"
              width="32"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              {isUp ? (
                <path
                  d="M 0 24 L 0 16 C 8 4, 24 4, 32 16 L 32 24 Z"
                  fill={fillColor}
                />
              ) : (
                <path
                  d="M 0 0 L 0 8 C 8 20, 24 20, 32 8 L 32 0 Z"
                  fill={fillColor}
                />
              )}
            </pattern>
          </defs>
          <rect width="100%" height="24" fill={`url(#${safeId})`} />
        </svg>
      </div>
    );
  }

  // Default 'line' variant: repeating delicate arched scallop line matching user's reference image
  const isUp = direction === 'up';
  const curvePath = isUp
    ? "M 0 12 C 6 2, 22 2, 28 12"
    : "M 0 2 C 6 12, 22 12, 28 2";

  return (
    <div className={`relative w-full py-2 flex items-center justify-center overflow-hidden my-2 sm:my-3 ${className}`}>
      {/* Repeating SVG Scalloped Arches Line */}
      <svg
        className={`w-full h-3 sm:h-3.5 block ${color}`}
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={safeId}
            x="0"
            y="0"
            width="28"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={curvePath}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill={`url(#${safeId})`} />
      </svg>

      {/* Optional decorative center badge / doodle floating in the middle */}
      {centerBadge && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-[#FFF9F5] px-3.5 py-0.5 rounded-full z-10 flex items-center justify-center shadow-2xs">
          {centerBadge}
        </div>
      )}
    </div>
  );
}
