import React from 'react';

/**
 * Cheerful Happy Kid Character Illustration
 * Matching the Little Joys parent dashboard branding.
 * Depicts a joyful young boy with a warm smile, rosy cheeks, and playful energy.
 */
export default function ChildCharacterIllustration({ className = "w-32 h-32" }) {
  return (
    <svg 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Soft warm aura glow behind child */}
      <circle cx="80" cy="88" r="60" fill="#FEF3C7" fillOpacity="0.7" />
      <circle cx="80" cy="88" r="48" fill="#FDE68A" fillOpacity="0.4" />

      {/* Little floating sparkles */}
      <path d="M28 44L30 38L32 44L38 46L32 48L30 54L28 48L22 46L28 44Z" fill="#F59E0B" />
      <circle cx="132" cy="40" r="2.5" fill="#F59E0B" />
      <path d="M136 68L137.5 63L139 68L144 69.5L139 71L137.5 76L136 71L131 69.5L136 68Z" fill="#F59E0B" />

      {/* Shoulders & Green T-shirt */}
      <path 
        d="M36 142C36 122 48 110 80 110C112 110 124 122 124 142V150H36V142Z" 
        fill="#10B981" 
      />
      {/* T-shirt Collar */}
      <path 
        d="M66 110C66 118 72 124 80 124C88 124 94 118 94 110" 
        stroke="#047857" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      {/* Cheerful Orange detail stripes */}
      <circle cx="80" cy="134" r="3" fill="#F97316" />
      <circle cx="80" cy="144" r="3" fill="#F97316" />

      {/* Child Neck */}
      <rect x="72" y="98" width="16" height="16" rx="4" fill="#FCD34D" />
      <path d="M72 105C76 109 84 109 88 105" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

      {/* Head / Face Base */}
      <path 
        d="M44 68C44 46 60 34 80 34C100 34 116 46 116 68C116 88 100 102 80 102C60 102 44 88 44 68Z" 
        fill="#FDE68A" 
      />

      {/* Cute Big Ears */}
      <circle cx="44" cy="70" r="10" fill="#FDE68A" />
      <circle cx="44" cy="70" r="5.5" fill="#FCA5A5" fillOpacity="0.6" />

      <circle cx="116" cy="70" r="10" fill="#FDE68A" />
      <circle cx="116" cy="70" r="5.5" fill="#FCA5A5" fillOpacity="0.6" />

      {/* Messy Playful Kid Hair */}
      <path 
        d="M42 56C38 48 44 32 60 26C72 21 88 21 100 26C116 32 122 48 118 56C112 50 108 46 98 46C86 46 82 50 80 48C76 46 70 45 62 46C52 47 48 51 42 56Z" 
        fill="#78350F" 
      />
      {/* Front Hair Strands / Bangs */}
      <path 
        d="M48 46C56 40 68 44 74 48C78 43 86 42 94 48C102 43 110 46 114 52C116 40 104 28 88 26C74 24 58 28 48 46Z" 
        fill="#92400E" 
      />
      {/* Cute tuft on top */}
      <path 
        d="M74 26C72 18 78 14 84 18C86 14 92 16 90 24" 
        fill="#78350F" 
      />

      {/* Joyful Eyes (Crescent Arc Smile Eyes) */}
      <path 
        d="M58 64C62 60 70 60 74 64" 
        stroke="#451A03" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M86 64C90 60 98 60 102 64" 
        stroke="#451A03" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />

      {/* Cute Eyebrows */}
      <path 
        d="M58 56C62 53 68 54 72 57" 
        stroke="#78350F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M88 57C92 54 98 53 102 56" 
        stroke="#78350F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Rosy Blush Cheeks */}
      <ellipse cx="54" cy="74" rx="7" ry="4.5" fill="#F87171" fillOpacity="0.55" />
      <ellipse cx="106" cy="74" rx="7" ry="4.5" fill="#F87171" fillOpacity="0.55" />

      {/* Cute Button Nose */}
      <path 
        d="M78 70C79 72 81 72 82 70" 
        stroke="#B45309" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />

      {/* Huge Cheerful Open Smile */}
      <path 
        d="M66 76C66 88 94 88 94 76H66Z" 
        fill="#DC2626" 
      />
      {/* Little White Teeth Bar */}
      <path 
        d="M69 76C71 79 89 79 91 76H69Z" 
        fill="#FFFFFF" 
      />
      {/* Tongue */}
      <path 
        d="M73 83C76 80 84 80 87 83C85 86 75 86 73 83Z" 
        fill="#FCA5A5" 
      />
      <path 
        d="M65 76C65 89 95 89 95 76" 
        stroke="#451A03" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Raised Little Cheerful Hands Waving */}
      {/* Left Hand */}
      <circle cx="34" cy="116" r="9" fill="#FDE68A" />
      <circle cx="34" cy="116" r="7" fill="#FCD34D" />
      <path d="M28 112C29 108 34 108 36 112" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />

      {/* Right Hand */}
      <circle cx="126" cy="116" r="9" fill="#FDE68A" />
      <circle cx="126" cy="116" r="7" fill="#FCD34D" />
      <path d="M124 112C126 108 131 108 132 112" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
