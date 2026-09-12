import React from 'react';

/**
 * Playful, whimsical SVG illustrations and doodles crafted specifically
 * for children's nutrition branding (Little Joys vibe).
 */

// Cheerful Smiling Sun with gentle rays
export function SunDoodle({ className = "w-8 h-8 text-amber-400" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={`inline-block ${className}`}>
      {/* Sun rays */}
      <path d="M32 4V12M32 52V60M4 32H12M52 32H60M12.2 12.2L17.8 17.8M46.2 46.2L51.8 51.8M12.2 51.8L17.8 46.2M46.2 17.8L51.8 12.2" 
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Sun body */}
      <circle cx="32" cy="32" r="16" fill="#FDE68A" stroke="currentColor" strokeWidth="3" />
      {/* Happy eyes */}
      <circle cx="26" cy="30" r="2" fill="#78350F" />
      <circle cx="38" cy="30" r="2" fill="#78350F" />
      {/* Rosy cheeks */}
      <circle cx="22" cy="34" r="2" fill="#FCA5A5" />
      <circle cx="42" cy="34" r="2" fill="#FCA5A5" />
      {/* Big joyful smile */}
      <path d="M26 34C28 38 36 38 38 34" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Playful 4-Point & 5-Point Twinkle Stars
export function StarDoodle({ className = "w-5 h-5 text-amber-400" }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={`inline-block ${className}`}>
      <path d="M16 2 C16 9, 23 16, 30 16 C23 16, 16 23, 16 30 C16 23, 9 16, 2 16 C9 16, 16 9, 16 2 Z" />
    </svg>
  );
}

export function MiniStarCluster({ className = "text-amber-400" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <StarDoodle className="w-4 h-4 animate-pulse" />
      <StarDoodle className="w-2.5 h-2.5 opacity-70" />
    </span>
  );
}

// Cute Pastel Rainbow
export function RainbowDoodle({ className = "w-10 h-6" }) {
  return (
    <svg viewBox="0 0 64 36" fill="none" className={`inline-block ${className}`}>
      {/* Outer band (Rose) */}
      <path d="M 6 34 A 26 26 0 0 1 58 34" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" />
      {/* Middle band (Amber) */}
      <path d="M 14 34 A 18 18 0 0 1 50 34" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      {/* Inner band (Emerald) */}
      <path d="M 22 34 A 10 10 0 0 1 42 34" stroke="#34D399" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// Soft Happy Cloud Doodle
export function CloudDoodle({ className = "w-12 h-8 text-sky-300" }) {
  return (
    <svg viewBox="0 0 64 40" fill="none" className={`inline-block ${className}`}>
      <path
        d="M18 34H48C54 34 58 29 58 23C58 18 54 14 49 14C48 9 43 5 36 5C30 5 25 8 23 13C21 12 18 12 16 13C10 15 6 20 6 26C6 31 11 34 18 34Z"
        fill="#E0F2FE"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Cute eyes */}
      <path d="M26 22C27 21 29 21 30 22" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 22C37 21 39 21 40 22" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="23" cy="25" r="1.5" fill="#FDA4AF" />
      <circle cx="43" cy="25" r="1.5" fill="#FDA4AF" />
    </svg>
  );
}

// Friendly Sprout / Green Leaf Seedling
export function SproutDoodle({ className = "w-6 h-6 text-emerald-500" }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={`inline-block ${className}`}>
      {/* Stem */}
      <path d="M18 32V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Left Leaf */}
      <path d="M18 22C12 22 8 16 9 10C15 9 18 14 18 22Z" fill="#86EFAC" stroke="currentColor" strokeWidth="2.5" />
      {/* Right Leaf */}
      <path d="M18 18C24 18 28 12 27 6C21 5 18 10 18 18Z" fill="#4ADE80" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

// Hand-Drawn Wavy Squiggle Underline
export function WavyUnderline({ className = "w-32 h-3 text-pink-400" }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" className={`block ${className}`}>
      <path
        d="M 2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 6"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Playful Hand-Drawn Arrow pointing to CTAs
export function SquiggleArrow({ className = "w-8 h-8 text-[#13805B]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={`inline-block ${className}`}>
      <path
        d="M8 12 C 14 6, 26 8, 22 20 C 18 30, 32 32, 40 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M34 22 L42 28 L36 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Cheerful Hand-Drawn Heart Doodle
export function HeartDoodle({ className = "w-5 h-5 text-rose-400" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={`inline-block ${className}`}>
      <path
        d="M16 28 C 12 24, 4 18, 4 11 C 4 6, 8 3, 12.5 3 C 14.8 3, 16 4.5, 16 4.5 C 16 4.5, 17.2 3, 19.5 3 C 24 3, 28 6, 28 11 C 28 18, 20 24, 16 28 Z"
        fill="#FECDD3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-Drawn Playful Stamp / Badge ("Kids Approved")
export function KidStampBadge({ text = "100% TASTY", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-amber-50 border-2 border-dashed border-amber-300 px-3 py-1 rounded-full shadow-xs ${className}`}>
      <SunDoodle className="w-4 h-4 text-amber-500" />
      <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
        {text}
      </span>
    </div>
  );
}

// 🦸 Cheerful Hand-Drawn Superhero Kid Flying with Cape (Iconic Little Joys Healthy Habits illustration)
export function FlyingKidDoodle({ className = "w-48 h-24" }) {
  return (
    <svg viewBox="0 0 240 100" fill="none" className={`inline-block ${className}`}>
      {/* Wind trail squiggles */}
      <path d="M 20 62 Q 35 55, 50 64 T 75 60 T 98 62" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      <path d="M 10 70 Q 30 65, 55 72 T 90 68" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 30 48 Q 50 42, 70 50 T 95 46" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Floating Red/Orange Superhero Cape waving in the wind */}
      <path 
        d="M 125 45 C 95 38, 70 42, 52 48 C 65 54, 85 52, 105 56 C 85 62, 60 60, 48 68 C 75 70, 105 62, 128 58 Z" 
        fill="#FF6B6B" 
        stroke="#1E293B" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />

      {/* Trailing Little Legs */}
      <path d="M 115 58 Q 102 62, 90 64" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="88" cy="65" r="3.5" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" />
      
      <path d="M 118 64 Q 106 68, 96 72" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="94" cy="73" r="3.5" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" />

      {/* Child Body in Flying Posture (horizontal) */}
      <path d="M 120 48 C 135 46, 155 48, 168 52 C 162 64, 138 65, 122 60 Z" fill="#FDE047" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Outstretched Superhero Left Arm (forward) */}
      <path d="M 160 48 Q 185 40, 205 38" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Little Fisted Hand punching the air */}
      <circle cx="207" cy="37" r="4.5" fill="#FED7AA" stroke="#1E293B" strokeWidth="2" />

      {/* Right Arm (bent forward) */}
      <path d="M 152 56 Q 170 54, 185 50" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="187" cy="49" r="4" fill="#FED7AA" stroke="#1E293B" strokeWidth="1.8" />

      {/* Child Head */}
      <circle cx="168" cy="42" r="14" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />

      {/* Messy Playful Kid Hair */}
      <path 
        d="M 156 38 C 154 30, 162 25, 172 26 C 180 26, 184 32, 182 38 C 176 33, 168 33, 156 38 Z" 
        fill="#78350F" 
        stroke="#1E293B" 
        strokeWidth="2" 
      />
      {/* Hair tufts */}
      <path d="M 172 25 Q 175 18, 178 24" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 164 26 Q 163 19, 168 25" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

      {/* Joyful Facial Features */}
      <circle cx="172" cy="40" r="1.8" fill="#1E293B" /> {/* Eye */}
      <path d="M 170 45 Q 175 49, 178 44" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" /> {/* Grin */}
      <circle cx="167" cy="44" r="2.5" fill="#FDA4AF" opacity="0.8" /> {/* Rosy cheek */}

      {/* Little sparkle stars around child */}
      <path d="M 215 25 L 217 20 L 219 25 L 224 27 L 219 29 L 217 34 L 215 29 L 210 27 Z" fill="#F59E0B" />
      <path d="M 130 20 L 131 16 L 132 20 L 136 21 L 132 22 L 131 26 L 130 22 L 126 21 Z" fill="#F59E0B" />
      <path d="M 195 65 L 196 61 L 197 65 L 201 66 L 197 67 L 196 71 L 195 67 L 191 66 Z" fill="#10B981" />
    </svg>
  );
}

// 🥕 Hand-Drawn Fresh Organic Carrot with Green Leafy Top
export function CarrotDoodle({ className = "w-12 h-20" }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={`inline-block ${className}`}>
      {/* Feathery carrot foliage */}
      <path d="M 30 35 C 24 22, 16 16, 12 8 C 22 14, 28 22, 30 35 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" />
      <path d="M 30 35 C 30 18, 32 8, 30 2 C 34 10, 34 20, 30 35 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
      <path d="M 30 35 C 36 22, 44 16, 48 8 C 38 14, 32 22, 30 35 Z" fill="#4ADE80" stroke="#14532D" strokeWidth="1.5" />
      
      {/* Carrot body */}
      <path 
        d="M 20 35 C 18 38, 22 75, 29 96 C 30 98, 31 98, 32 96 C 38 75, 42 38, 40 35 C 34 32, 26 32, 20 35 Z" 
        fill="#FB923C" 
        stroke="#7C2D12" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
      {/* Organic texture stripes */}
      <path d="M 24 45 Q 30 46, 33 44" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 26 56 Q 32 58, 36 55" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 27 68 Q 31 70, 35 67" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 28 80 Q 30 81, 33 79" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 🥬 Hand-Drawn Leafy Cabbage / Veggies Cluster
export function VeggiesClusterDoodle({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block ${className}`}>
      {/* Back leaf */}
      <path 
        d="M 20 55 C 10 40, 15 20, 35 15 C 45 22, 40 38, 32 52 Z" 
        fill="#86EFAC" 
        stroke="#15803D" 
        strokeWidth="2" 
      />
      {/* Middle leaf */}
      <path 
        d="M 60 55 C 70 40, 65 20, 45 15 C 35 22, 40 38, 48 52 Z" 
        fill="#4ADE80" 
        stroke="#15803D" 
        strokeWidth="2" 
      />
      {/* Main front leaf bulb */}
      <path 
        d="M 40 70 C 24 70, 18 55, 24 40 C 30 28, 50 28, 56 40 C 62 55, 56 70, 40 70 Z" 
        fill="#22C55E" 
        stroke="#15803D" 
        strokeWidth="2.5" 
      />
      {/* Leaf ribs */}
      <path d="M 40 70 V 42" stroke="#DCFCE7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 40 55 Q 32 50, 28 48" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
      <path d="M 40 50 Q 48 45, 52 42" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 🌿 Hand-Drawn Fresh Herb Sprig / Leek
export function SprigDoodle({ className = "w-12 h-16" }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" className={`inline-block ${className}`}>
      <path d="M 30 75 Q 32 45, 28 10" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves on sides */}
      <path d="M 30 60 C 20 58, 12 50, 14 42 C 22 45, 28 52, 30 60 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
      <path d="M 30 50 C 40 48, 48 40, 46 32 C 38 35, 32 42, 30 50 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
      <path d="M 29 35 C 19 33, 14 25, 16 18 C 23 20, 28 27, 29 35 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
      <path d="M 28 25 C 38 23, 44 15, 42 8 C 35 11, 30 18, 28 25 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    </svg>
  );
}

// 🍎 Hand-Drawn Sweet Red Fruit / Apple Doodle
export function AppleFruitDoodle({ className = "w-12 h-14" }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className={`inline-block ${className}`}>
      {/* Stem & Leaf */}
      <path d="M 30 22 C 31 14, 35 10, 38 6" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 32 16 C 42 12, 45 18, 42 22 C 36 22, 33 18, 32 16 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      {/* Apple body */}
      <path 
        d="M 30 24 C 22 22, 10 26, 10 40 C 10 56, 24 64, 30 64 C 36 64, 50 56, 50 40 C 50 26, 38 22, 30 24 Z" 
        fill="#F43F5E" 
        stroke="#9F1239" 
        strokeWidth="2.5" 
        strokeLinejoin="round" 
      />
      {/* Highlight curve */}
      <path d="M 16 34 C 15 42, 18 50, 22 54" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 🔬 Iconic Circular Nutrition & Science Seal Stamp
export function ScienceNutritionSeal({ className = "w-28 h-28" }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={`inline-block ${className}`}>
      {/* Outer dashed guarantee ring */}
      <circle cx="70" cy="70" r="64" stroke="#13805B" strokeWidth="2" strokeDasharray="5 3" />
      {/* Solid inner border */}
      <circle cx="70" cy="70" r="56" stroke="#13805B" strokeWidth="3" fill="#E6F5EF" />

      {/* Curved Circular Text around seal */}
      <path id="sealTextPathTop" d="M 22 70 A 48 48 0 0 1 118 70" fill="none" />
      <text fill="#0F5A40" fontSize="8" fontWeight="900" letterSpacing="2">
        <textPath href="#sealTextPathTop" startOffset="50%" textAnchor="middle">
          NUTRITIOUS • SAFE • NATURAL
        </textPath>
      </text>

      <path id="sealTextPathBottom" d="M 118 70 A 48 48 0 0 1 22 70" fill="none" />
      <text fill="#0F5A40" fontSize="7.5" fontWeight="900" letterSpacing="1.8">
        <textPath href="#sealTextPathBottom" startOffset="50%" textAnchor="middle">
          BACKED BY SCIENCE + CARE
        </textPath>
      </text>

      {/* Central Clean Nutrition Container / Bottle Icon */}
      <g transform="translate(48, 42)">
        <rect x="12" y="6" width="20" height="6" rx="2" fill="#13805B" />
        <path d="M 15 12 L 8 20 L 8 50 C 8 54, 12 56, 16 56 L 28 56 C 32 56, 36 54, 36 50 L 36 20 L 29 12 Z" fill="#22C55E" stroke="#0F5A40" strokeWidth="2.5" />
        {/* Heart / Leaf on bottle */}
        <path d="M 22 36 C 18 32, 14 27, 18 23 C 21 21, 22 24, 22 24 C 22 24, 23 21, 26 23 C 30 27, 26 32, 22 36 Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

