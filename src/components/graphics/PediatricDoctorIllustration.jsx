import React from 'react';

/**
 * High-fidelity, friendly Pediatrician Doctor SVG Illustration
 * Crafted specifically for the Little Joys Doctor-Backed Assessment Section.
 */
export default function PediatricDoctorIllustration({ className = "w-full max-w-xs md:max-w-sm lg:max-w-md" }) {
  return (
    <svg
      viewBox="0 0 440 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none drop-shadow-2xl  ${className}`}
    >
      <defs>
        {/* Soft Ambient Background Aura */}
        <radialGradient id="docBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#047857" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
        </radialGradient>

        {/* Doctor Coat Gradients */}
        <linearGradient id="coatGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        <linearGradient id="coatShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Teal Scrubs */}
        <linearGradient id="scrubsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>

        {/* Clipboard Card Gradient */}
        <linearGradient id="clipboardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>

        {/* Shield Gold/Emerald Gradient */}
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* 1. Ambient Background Glowing Disc */}
      <circle cx="220" cy="220" r="180" fill="url(#docBgGlow)" />

      {/* Decorative Floating Tech/Nutrition Rings */}
      <circle cx="220" cy="220" r="160" stroke="#34D399" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" />
      <circle cx="220" cy="220" r="135" stroke="#6EE7B7" strokeWidth="1" opacity="0.2" />

      {/* 2. Floating Pediatric Badges & Pills (Left & Right) */}
      
      {/* Top Left Floating Pill: "100% Doctor Backed" */}
      <g transform="translate(25, 60)" >
        <rect width="155" height="34" rx="17" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="9" fill="#10B981" />
        <path d="M14 17L16.5 19.5L20 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="21" fill="#FFFFFF" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
          Pediatric Certified
        </text>
      </g>

      {/* Top Right Floating Pill: "ICMR Dosages" */}
      <g transform="translate(290, 75)">
        <rect width="145" height="34" rx="17" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="9" fill="#F59E0B" />
        <text x="14" y="20.5" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">★</text>
        <text x="32" y="21" fill="#FFFFFF" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
          ICMR Calibrated
        </text>
      </g>

      {/* Floating Nutrition Shield (Bottom Left) */}
      <g transform="translate(20, 270)">
        <rect width="48" height="48" rx="24" fill="#047857" stroke="#34D399" strokeWidth="2" />
        <path d="M24 12L34 16V24C34 30 29.5 35 24 37C18.5 35 14 30 14 24V16L24 12Z" fill="url(#shieldGrad)" />
        <path d="M24 19V29M19 24H29" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* 3. Doctor Torso & Shoulders */}
      {/* Torso Base */}
      <path
        d="M130 420 C130 330, 150 270, 220 270 C290 270, 310 330, 310 420 Z"
        fill="#1E293B"
      />

      {/* Teal Scrubs Chest V-Neck */}
      <path
        d="M190 220 L220 280 L250 220 Z"
        fill="url(#scrubsGrad)"
      />
      <path
        d="M205 220 L220 250 L235 220 Z"
        fill="#042F2E"
        opacity="0.3"
      />

      {/* White Doctor's Lab Coat - Body */}
      <path
        d="M135 420 C135 320, 155 245, 195 230 L220 300 L245 230 C285 245, 305 320, 305 420 Z"
        fill="url(#coatGrad)"
      />

      {/* Left Lapel (Doctor's Right) */}
      <path
        d="M190 225 L160 310 L195 310 L210 260 Z"
        fill="url(#coatGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />
      {/* Right Lapel */}
      <path
        d="M250 225 L280 310 L245 310 L230 260 Z"
        fill="url(#coatGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Coat Center Fold & Buttons */}
      <line x1="220" y1="300" x2="220" y2="420" stroke="#94A3B8" strokeWidth="2" strokeDasharray="8 6" />
      <circle cx="220" cy="335" r="3.5" fill="#64748B" />
      <circle cx="220" cy="370" r="3.5" fill="#64748B" />
      <circle cx="220" cy="405" r="3.5" fill="#64748B" />

      {/* Coat Pocket with Pen */}
      <rect x="245" y="325" width="28" height="32" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="252" y="316" width="4" height="12" rx="2" fill="#0D9488" />
      <rect x="260" y="314" width="4" height="14" rx="2" fill="#3B82F6" />

      {/* 4. Realistic Stethoscope Draped Around Neck */}
      {/* Left Tube */}
      <path
        d="M185 220 C175 250, 175 320, 205 345 C215 355, 225 355, 235 345 C250 330, 255 260, 255 220"
        fill="none"
        stroke="#0F766E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M185 220 C175 250, 175 320, 205 345 C215 355, 225 355, 235 345 C250 330, 255 260, 255 220"
        fill="none"
        stroke="#2DD4BF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Stethoscope Extension Tubing & Chest Piece */}
      <path d="M218 352 L215 375" stroke="#0F766E" strokeWidth="4.5" strokeLinecap="round" />
      {/* Metallic Chestpiece */}
      <circle cx="215" cy="385" r="11" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="215" cy="385" r="7" fill="#E2E8F0" />
      {/* Heart Logo in Stethoscope */}
      <path d="M215 383 C213 381, 210 382, 211 384 C211 386, 215 388, 215 388 C215 388, 219 386, 219 384 C220 382, 217 381, 215 383 Z" fill="#EF4444" />

      {/* 5. Doctor's Neck & Face */}
      {/* Neck */}
      <rect x="202" y="180" width="36" height="45" rx="10" fill="#FDBA74" />
      <path d="M202 205 C212 215, 228 215, 238 205 Z" fill="#FB923C" opacity="0.3" />

      {/* Head */}
      <ellipse cx="220" cy="155" rx="38" ry="44" fill="#FED7AA" />

      {/* Ears */}
      <circle cx="180" cy="155" r="8" fill="#FDBA74" />
      <circle cx="260" cy="155" r="8" fill="#FDBA74" />

      {/* Hair (Professional, Neat Indian Doctor Style) */}
      <path
        d="M178 145 C176 115, 200 95, 225 95 C255 95, 265 115, 262 145 C258 130, 248 120, 225 120 C202 120, 185 130, 178 145 Z"
        fill="#1E293B"
      />
      {/* Side hair locks */}
      <path d="M180 140 C178 155, 182 165, 185 170" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
      <path d="M260 140 C262 155, 258 165, 255 170" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M196 142 Q206 138, 212 142" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M228 142 Q234 138, 244 142" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Warm, Caring Eyes */}
      <circle cx="204" cy="152" r="3.5" fill="#1E293B" />
      <circle cx="203" cy="150.5" r="1.2" fill="#FFFFFF" />

      <circle cx="236" cy="152" r="3.5" fill="#1E293B" />
      <circle cx="235" cy="150.5" r="1.2" fill="#FFFFFF" />

      {/* Gentle Smile & Nose */}
      <path d="M220 152 V162 L223 164" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M208 172 Q220 182, 232 172" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M212 174 Q220 180, 228 174" fill="#FFFFFF" /> {/* White teeth flash */}

      {/* Rosy Friendly Cheeks */}
      <circle cx="196" cy="162" r="4.5" fill="#FDA4AF" opacity="0.6" />
      <circle cx="244" cy="162" r="4.5" fill="#FDA4AF" opacity="0.6" />

      {/* 6. Smart Pediatric Health Assessment Clipboard (Held by Doctor) */}
      <g transform="translate(265, 240) rotate(-6)">
        {/* Clipboard Backing Board */}
        <rect x="0" y="10" width="135" height="175" rx="14" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
        {/* Metallic Clip on Top */}
        <rect x="42" y="2" width="50" height="18" rx="5" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <circle cx="67" cy="11" r="3" fill="#E2E8F0" />

        {/* Paper on Clipboard */}
        <rect x="8" y="20" width="119" height="155" rx="8" fill="url(#clipboardGrad)" />

        {/* Header on Chart */}
        <rect x="18" y="32" width="70" height="8" rx="3" fill="#0D9488" />
        <rect x="18" y="44" width="95" height="3" rx="1.5" fill="#E2E8F0" />

        {/* Child Growth Curve Graphic */}
        <path
          d="M20 90 Q40 85, 55 70 T90 55 T115 48"
          fill="none"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Data points */}
        <circle cx="20" cy="90" r="3" fill="#059669" />
        <circle cx="55" cy="70" r="3" fill="#059669" />
        <circle cx="90" cy="55" r="3" fill="#059669" />
        <circle cx="115" cy="48" r="3" fill="#059669" />

        {/* Checklists: Calcium, Brain DHA, Immunity */}
        <g transform="translate(18, 105)">
          {/* Row 1 */}
          <circle cx="5" cy="6" r="4.5" fill="#10B981" />
          <path d="M3.5 6L4.5 7L7 5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="14" y="3" width="75" height="5" rx="2" fill="#334155" />

          {/* Row 2 */}
          <circle cx="5" cy="22" r="4.5" fill="#10B981" />
          <path d="M3.5 22L4.5 23L7 21" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="14" y="19" width="60" height="5" rx="2" fill="#334155" />

          {/* Row 3 */}
          <circle cx="5" cy="38" r="4.5" fill="#10B981" />
          <path d="M3.5 38L4.5 39L7 37" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="14" y="35" width="80" height="5" rx="2" fill="#334155" />

          {/* 100% Score Tag */}
          <rect x="14" y="50" width="82" height="14" rx="7" fill="#DCFCE7" />
          <text x="24" y="60" fill="#15803D" fontSize="8" fontWeight="900" fontFamily="sans-serif">
            ✓ 100% BALANCED
          </text>
        </g>
      </g>

      {/* Doctor's Hand Holding the Clipboard */}
      <path
        d="M260 360 C265 340, 280 340, 290 355 C295 365, 290 375, 275 380 Z"
        fill="#FED7AA"
        stroke="#FDBA74"
        strokeWidth="1.5"
      />
      {/* Fingers grasping clipboard edge */}
      <rect x="270" y="348" width="8" height="14" rx="4" fill="#FDBA74" />
      <rect x="278" y="352" width="8" height="14" rx="4" fill="#FDBA74" />
      <rect x="286" y="356" width="8" height="14" rx="4" fill="#FDBA74" />

      {/* Sparkles / Delight Accents */}
      <g transform="translate(370, 220)">
        <path d="M10 0L12 7L19 10L12 13L10 20L8 13L1 10L8 7Z" fill="#F59E0B" />
      </g>
      <g transform="translate(90, 170)">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="#34D399" />
      </g>
    </svg>
  );
}
