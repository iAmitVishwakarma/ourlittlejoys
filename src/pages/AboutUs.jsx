import React from 'react';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import ParentReviewsSection from '@/components/ParentReviewsSection';
import { KidStampBadge } from '@/components/graphics/KidsDoodles';
import {
  AboutHero,
  AboutOriginStory,
  AboutPurpose,
  AboutExpertBacking,
  AboutStatsBanner,
  AboutTeam,
  AboutBottomCta,
} from '@/components/about';

export default function AboutUs() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-800 overflow-hidden font-sans">
      <SEO
        title="About Us - Pure Organic Pediatric Nutrition | Nestor"
        description="We're a team of parents, doctors and nutrition experts on a mission to make children's nutrition simple, honest and joyful. Zero refined sugar, pediatrician formulated."
      />

      <AboutHero />

      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-orange-200/90" />
      </div>

      <AboutOriginStory />

      <AboutPurpose />

      <AboutExpertBacking />

      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="down" color="text-[#C89B58]/30" />
      </div>

      <AboutStatsBanner />

      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-orange-200/90" />
      </div>

      <AboutTeam />

      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider
          direction="up"
          color="text-orange-300/80"
          centerBadge={<KidStampBadge text="Loved by 2 Lakh+ Happy Kids" />}
        />
      </div>

      <ParentReviewsSection bgClass="bg-[#FAF6F0]/60" />

      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-amber-300/90" />
      </div>

      <AboutBottomCta />
    </div>
  );
}
