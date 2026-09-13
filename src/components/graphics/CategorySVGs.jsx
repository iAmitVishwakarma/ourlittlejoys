import React from 'react';

/**
 * Custom High-Fidelity Vector Illustrations for Little Joys Categories
 * Playful, premium, and child-friendly aesthetic.
 */

// 1. Nutrimix (Sprouted Millets & Natural Cocoa)
export function NutrimixCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#FEF3C7" opacity="0.6" />
      {/* Bowl */}
      <ellipse cx="40" cy="54" rx="26" ry="12" fill="#D97706" opacity="0.3" />
      <path d="M16 46C16 60 26 66 40 66C54 66 64 60 64 46H16Z" fill="#F59E0B" />
      <path d="M18 46C18 58 28 64 40 64C52 64 62 58 62 46H18Z" fill="#FBBF24" />
      {/* Chocolate milk drink inside */}
      <ellipse cx="40" cy="46" rx="22" ry="7" fill="#78350F" />
      {/* Milk swirl */}
      <path d="M30 46C35 48 45 44 50 46" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
      {/* Sprouted Millet ear / stalks rising up */}
      <path d="M40 44V18" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 32C34 30 32 25 34 20C38 23 39 28 40 32Z" fill="#22C55E" />
      <path d="M40 26C46 24 48 19 46 14C42 17 41 22 40 26Z" fill="#4ADE80" />
      <path d="M40 20C35 17 34 11 37 8C40 12 40 16 40 20Z" fill="#86EFAC" />
      {/* Golden Millet grains */}
      <circle cx="28" cy="36" r="3.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <circle cx="52" cy="34" r="3.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      {/* Cute Green Sprout shoot */}
      <path d="M53 32C56 28 60 28 62 30" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 2. Gummies (12 Essential Vitamins - Cute smiling Gummy Bear)
export function GummiesCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#FCE7F3" opacity="0.7" />
      {/* Cute Strawberry Gummy Bear */}
      {/* Ears */}
      <circle cx="26" cy="22" r="7" fill="#F43F5E" />
      <circle cx="26" cy="22" r="4" fill="#FDA4AF" />
      <circle cx="54" cy="22" r="7" fill="#F43F5E" />
      <circle cx="54" cy="22" r="4" fill="#FDA4AF" />
      {/* Bear Head */}
      <ellipse cx="40" cy="32" rx="17" ry="15" fill="#FB7185" />
      <ellipse cx="40" cy="32" rx="16" ry="14" fill="#F43F5E" />
      {/* Cheerful Eyes */}
      <circle cx="34" cy="29" r="2.2" fill="#881337" />
      <circle cx="33.5" cy="28" r="0.8" fill="#FFFFFF" />
      <circle cx="46" cy="29" r="2.2" fill="#881337" />
      <circle cx="45.5" cy="28" r="0.8" fill="#FFFFFF" />
      {/* Snout & Smile */}
      <ellipse cx="40" cy="35" rx="5" ry="3.5" fill="#FDA4AF" />
      <circle cx="40" cy="34" r="1.5" fill="#881337" />
      <path d="M38 36Q40 38 42 36" stroke="#881337" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bear Body */}
      <path d="M25 44C25 40 32 38 40 38C48 38 55 40 55 44C55 56 52 65 40 65C28 65 25 56 25 44Z" fill="#F43F5E" />
      {/* Tummy highlight */}
      <ellipse cx="40" cy="50" rx="9" ry="10" fill="#FB7185" />
      {/* Heart on Tummy */}
      <path d="M40 52C38 49 35 50 36 53C37 55 40 57 40 57C40 57 43 55 44 53C45 50 42 49 40 52Z" fill="#FFFFFF" opacity="0.85" />
      {/* Paws */}
      <ellipse cx="23" cy="46" rx="4.5" ry="3.5" fill="#F43F5E" />
      <ellipse cx="57" cy="46" rx="4.5" ry="3.5" fill="#F43F5E" />
      {/* Feet */}
      <ellipse cx="29" cy="64" rx="5.5" ry="4" fill="#E11D48" />
      <ellipse cx="51" cy="64" rx="5.5" ry="4" fill="#E11D48" />
      {/* Sparkle Star */}
      <path d="M63 16L64.5 21L69 22.5L64.5 24L63 29L61.5 24L57 22.5L61.5 21Z" fill="#FBBF24" />
    </svg>
  );
}

// 3. Spreads & Sauce (Jaggery & Hazelnut Jar)
export function SpreadsCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#FEF3C7" opacity="0.7" />
      {/* Hazelnut Jar */}
      {/* Lid */}
      <rect x="25" y="20" width="30" height="7" rx="3.5" fill="#D97706" />
      <rect x="28" y="27" width="24" height="3" fill="#B45309" />
      {/* Glass Jar Body */}
      <path d="M23 30C23 30 20 38 20 54C20 62 26 66 40 66C54 66 60 62 60 54C60 38 57 30 57 30H23Z" fill="#92400E" />
      {/* Jar chocolate fill */}
      <path d="M22 34C22 34 21 40 21 54C21 61 27 64 40 64C53 64 59 61 59 54C59 40 58 34 58 34H22Z" fill="#78350F" />
      {/* Label on Jar */}
      <rect x="26" y="38" width="28" height="18" rx="4" fill="#FEF3C7" />
      {/* Hazelnut Illustration on Label */}
      <ellipse cx="37" cy="47" rx="4.5" ry="5.5" fill="#B45309" />
      <ellipse cx="43" cy="48" rx="4" ry="5" fill="#D97706" />
      {/* Green Leaf on top of hazelnut */}
      <path d="M37 42C35 39 38 38 41 39C41 41 39 42 37 42Z" fill="#16A34A" />
      {/* Dipping Wooden Spoon with chocolate drip */}
      <path d="M50 12L58 26" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="58" cy="27" rx="4" ry="6" fill="#78350F" transform="rotate(-30 58 27)" />
      {/* Sweet drip */}
      <circle cx="56" cy="36" r="2" fill="#78350F" />
    </svg>
  );
}

// 4. Cereals & Snacks (Millet Stars jumping out of bowl)
export function CerealsCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#E0F2FE" opacity="0.7" />
      {/* Breakfast Bowl */}
      <path d="M18 46C18 59 28 66 40 66C52 66 62 59 62 46H18Z" fill="#0284C7" />
      <path d="M20 46C20 57 29 64 40 64C51 64 60 57 60 46H20Z" fill="#38BDF8" />
      {/* Milk in bowl */}
      <ellipse cx="40" cy="46" rx="20" ry="6" fill="#FFFFFF" />
      {/* Big Joyful Crunchy Millet Star in Center */}
      <g transform="translate(30, 18) scale(1.1)">
        <path
          d="M10 0L13 7L20 8L15 13L16 20L10 16L4 20L5 13L0 8L7 7Z"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Cute Face on Main Star */}
        <circle cx="8" cy="9" r="1" fill="#78350F" />
        <circle cx="12" cy="9" r="1" fill="#78350F" />
        <path d="M9 11Q10 13 11 11" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
      </g>
      {/* Smaller Jumping Stars */}
      <path d="M18 25L19.5 29L24 29.5L20.5 32.5L21.5 37L18 34.5L14.5 37L15.5 32.5L12 29.5L16.5 29Z" fill="#F59E0B" />
      <path d="M56 22L57.5 26L61 26.5L58.5 29L59.5 33L56 31L52.5 33L53.5 29L51 26.5L54.5 26Z" fill="#F59E0B" />
      {/* Milk splash drops */}
      <circle cx="28" cy="40" r="2" fill="#FFFFFF" />
      <circle cx="50" cy="38" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

// 5. Protein & Fibre (Clean Plant Strength & Immunity Kits)
export function ProteinCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#DCFCE7" opacity="0.7" />
      {/* Shaker Tumbler */}
      <rect x="28" y="16" width="24" height="6" rx="3" fill="#13805B" />
      <path d="M30 22L33 60C33 63 36 65 40 65C44 65 47 63 47 60L50 22H30Z" fill="#059669" />
      {/* Shaker measurement scale */}
      <line x1="36" y1="30" x2="40" y2="30" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="38" x2="42" y2="38" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="46" x2="40" y2="46" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
      {/* Glowing Immunity & Strength Shield Overlay */}
      <g transform="translate(42, 38)">
        <path d="M14 0L26 4V14C26 21 21 27 14 29C7 27 2 21 2 14V4L14 0Z" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
        {/* Plus Symbol */}
        <path d="M14 8V20M8 14H20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Organic Wheat / Pea pods on the left */}
      <circle cx="22" cy="42" r="3.5" fill="#84CC16" />
      <circle cx="20" cy="50" r="3.5" fill="#84CC16" />
      <circle cx="24" cy="58" r="3.5" fill="#84CC16" />
      <path d="M22 36C22 55 25 64 25 64" stroke="#65A30D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 6. Brain Health (Cognitive DHA & B12)
export function BrainHealthCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#EEF2FF" opacity="0.8" />
      {/* Glowing Brain Outline */}
      {/* Left Hemisphere */}
      <path
        d="M38 24C34 20 26 22 24 28C20 30 19 36 22 41C18 45 20 53 25 55C25 59 29 63 35 62C37 62 38 60 38 58V24Z"
        fill="#818CF8"
      />
      {/* Right Hemisphere */}
      <path
        d="M42 24C46 20 54 22 56 28C60 30 61 36 58 41C62 45 60 53 55 55C55 59 51 63 45 62C43 62 42 60 42 58V24Z"
        fill="#6366F1"
      />
      {/* Synapse light pathways */}
      <path d="M30 32C32 36 34 38 38 40" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 32C48 36 46 38 42 40" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 48C34 50 36 52 38 54" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 48C46 50 44 52 42 54" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
      {/* Glowing Neural Sparks */}
      <circle cx="40" cy="22" r="3" fill="#F59E0B" />
      <circle cx="22" cy="34" r="2.5" fill="#F59E0B" />
      <circle cx="58" cy="34" r="2.5" fill="#F59E0B" />
      {/* Golden Brain Energy Sparkle on top */}
      <path d="M40 10L42 15L47 16L42 18L40 23L38 18L33 16L38 15Z" fill="#FBBF24" />
    </svg>
  );
}

// 7. For Moms (Postpartum & Mother Care)
export function ForMomsCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#FFE4E6" opacity="0.8" />
      {/* Warm Mothering Mug / Cup */}
      <path d="M26 32C26 48 30 58 42 58C52 58 56 48 56 32H26Z" fill="#FB7185" />
      <path d="M28 32C28 46 32 56 42 56C51 56 54 46 54 32H28Z" fill="#F43F5E" />
      {/* Mug Handle */}
      <path d="M54 36C61 36 64 42 64 46C64 51 60 54 53 54" stroke="#FB7185" strokeWidth="4" strokeLinecap="round" />
      {/* Gentle Steam Rising with Heart */}
      <path d="M35 26C34 22 37 18 36 14" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M44 24C43 20 46 16 45 12" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Central Maternal Love Heart */}
      <path d="M41 44C38 41 33 43 35 47C37 51 41 53 41 53C41 53 45 51 47 47C49 43 44 41 41 44Z" fill="#FFFFFF" />
      {/* Botanical Lavender sprig beside cup */}
      <path d="M20 56C18 42 22 30 25 24" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="21" cy="40" rx="2.5" ry="4" fill="#C084FC" transform="rotate(-30 21 40)" />
      <ellipse cx="24" cy="32" rx="2.5" ry="4" fill="#C084FC" transform="rotate(25 24 32)" />
      <ellipse cx="25" cy="24" rx="2" ry="3.5" fill="#E9D5FF" />
    </svg>
  );
}

// 8. Best Value (Saver Multipacks & Combos)
export function BestValueCategorySVG({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={`inline-block select-none ${className}`}>
      {/* Soft circular background glow */}
      <circle cx="40" cy="40" r="36" fill="#FEF3C7" opacity="0.8" />
      {/* Gift / Value Combo Box */}
      <rect x="22" y="32" width="36" height="32" rx="6" fill="#13805B" />
      <rect x="24" y="34" width="32" height="28" rx="4" fill="#10B981" />
      {/* Box Lid */}
      <rect x="19" y="27" width="42" height="8" rx="4" fill="#047857" />
      {/* Festive Ribbon Vertical */}
      <rect x="37" y="27" width="6" height="37" fill="#F43F5E" />
      {/* Festive Ribbon Horizontal */}
      <rect x="22" y="44" width="36" height="6" fill="#F43F5E" />
      {/* Ribbon Bow on top */}
      <path d="M37 27C34 21 26 21 28 26C30 29 37 27 37 27Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1" />
      <path d="M43 27C46 21 54 21 52 26C50 29 43 27 43 27Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1" />
      <circle cx="40" cy="27" r="3" fill="#E11D48" />
      {/* Value % / COMBO Gold Tag */}
      <g transform="translate(44, 44)">
        <rect width="26" height="14" rx="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
        <text x="5" y="10.5" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
          SAVE
        </text>
      </g>
      {/* Sparkles */}
      <path d="M16 20L17.5 24L21 25.5L17.5 27L16 31L14.5 27L11 25.5L14.5 24Z" fill="#F59E0B" />
    </svg>
  );
}
