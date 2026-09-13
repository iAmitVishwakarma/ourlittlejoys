import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import ParentReviewsSection from '@/components/ParentReviewsSection';
import { 
  SunDoodle, 
  MiniStarCluster, 
  HeartDoodle, 
  WavyUnderline, 
  CrownDoodle,
  CurlyArrowDoodle,
  StrongBoyDoodle,
  KidStampBadge
} from '@/components/graphics/KidsDoodles';

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Rohit Sharma",
      role: "Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      quote: "As a parent, I know how hard it is to find truly healthy options for kids. Little Joys is our answer."
    },
    {
      name: "Dr. Rhea Mehta",
      role: "Head of Nutrition",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      quote: "Good nutrition in childhood builds stronger, happier futures. That's why we do what we do."
    },
    {
      name: "Karan Verma",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      quote: "We combine science, taste and transparency to create products kids love and parents trust."
    }
  ];

  const expertBadges = [
    { label: "Pediatrician Approved", icon: "🛡️", bg: "bg-rose-50 text-rose-700 border-rose-200" },
    { label: "Lab Tested", icon: "🔬", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { label: "No Refined Sugar", icon: "🌿", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { label: "100% Vegetarian", icon: "🌱", bg: "bg-green-50 text-green-700 border-green-200" },
    { label: "Made in India", icon: "🇮🇳", bg: "bg-amber-50 text-amber-800 border-amber-200" },
  ];

  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-800 overflow-hidden font-sans">
      <SEO
        title="About Us - Big Nutrition for Little Joys"
        description="We're a team of parents, doctors and nutrition experts on a mission to make children's nutrition simple, honest and joyful. Zero refined sugar, pediatrician formulated."
      />

      {/* =========================================================================
          SECTION 1: HERO - BIG NUTRITION FOR LITTLE JOYS
         ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6">
        {/* Subtle Warm Dot Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#FDBA74 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Blur Bubbles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Story & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 bg-[#FFFBEB] border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
                <span>💡</span> OUR STORY
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Big Nutrition <br />
                for <span className="text-[#FF387A]">Little Joys</span><span className="text-[#FF387A]">.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                We're a team of parents, doctors and nutrition experts on a mission to make children's nutrition simple, honest and joyful.
              </p>

              {/* 3 Pillar Badges */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-2">
                <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                  <span className="text-base">🧑‍🤝‍🧑</span>
                  <span>Parent Founded</span>
                </div>
                <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                  <span className="text-base">🩺</span>
                  <span>Doctor Guided</span>
                </div>
                <div className="flex items-center gap-2 bg-white/95 px-4 py-2.5 rounded-full border border-orange-100 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
                  <span className="text-base">💖</span>
                  <span>Child Approved</span>
                </div>
              </div>

              {/* Primary Action Button & Hand-drawn Doodle Note */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#from-home-to-yours"
                  className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-slate-900/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-2">
                  <CurlyArrowDoodle className="w-8 h-8 text-slate-400 rotate-[-12deg]" />
                  <div className="text-[11px] sm:text-xs text-slate-500 font-semibold italic">
                    loved daily by <br />
                    <span className="text-pink-600 font-bold not-italic">happiest growing champions ✨</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Girl with Milk Glass & Nutrimix Jar */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Floating Top-Right Note Badge */}
              <div className="absolute -top-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-100 shadow-md flex items-center gap-2 text-xs font-black text-slate-800 z-20">
                <span>Good Nutrition Brighter Tomorrows</span>
                <span className="text-pink-500">💖</span>
              </div>

              {/* Background Circular Halo */}
              <div className="w-72 sm:w-84 md:w-96 h-72 sm:h-84 md:h-96 rounded-full bg-gradient-to-tr from-amber-100 via-orange-50 to-pink-100 p-2 sm:p-3 relative shadow-inner">
                {/* Golden Crown Doodle over child's head */}
                <div className="absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 z-20 animate-bounce duration-1000">
                  <CrownDoodle className="w-14 h-11" />
                </div>

                {/* Main Child Image */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative group">
                  <img
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=700&q=80"
                    alt="Happy child drinking clean nutrition"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Frosted overlay accent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Nutrimix Jar Visual floating on bottom right */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-2.5 rounded-2xl border-2 border-emerald-200 shadow-xl z-20 flex items-center gap-3">
                  <div className="w-12 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex flex-col items-center justify-center text-white shadow-xs relative overflow-hidden">
                    <span className="text-base font-black leading-none">LJ</span>
                    <span className="text-[7px] font-bold tracking-tight uppercase mt-0.5">Nutrimix</span>
                    <span className="absolute bottom-0 inset-x-0 h-1.5 bg-amber-300" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[11px] font-black text-slate-900 leading-tight">Nutrimix</p>
                    <p className="text-[10px] text-emerald-600 font-bold">100% Sprouted Ragi</p>
                    <div className="flex items-center gap-1 text-[9px] text-amber-500 mt-0.5 font-extrabold">
                      <span>★ 4.8</span>
                      <span className="text-slate-400 font-normal">(4.6k)</span>
                    </div>
                  </div>
                </div>

                {/* Whimsical Floating Doodles around halo */}
                <div className="absolute -left-4 top-1/3">
                  <HeartDoodle className="w-6 h-6 text-rose-400 rotate-[-15deg]" />
                </div>
                <div className="absolute -left-2 bottom-6">
                  <MiniStarCluster className="text-amber-400" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 〰️ SCALLOP DIVIDER 1: Hero → Why We Started 〰️ */}
      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-orange-200/90" />
      </div>

      {/* =========================================================================
          SECTION 2: WHY WE STARTED - FROM OUR HOME TO YOURS
         ========================================================================= */}
      <section id="from-home-to-yours" className="py-16 md:py-24 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mother & Child Photo with Yellow Speech Bubble */}
            <div className="md:col-span-5 relative flex justify-center">
              {/* Organic Pebble Frame */}
            <div 
  className="w-72 sm:w-96 h-80 sm:h-[420px] relative bg-amber-50 shadow-xl overflow-hidden"
  style={{
    clipPath: 'path("M 40,0 C 250,-20 380,30 360,200 C 340,350 220,420 80,390 C -20,360 -10,120 40,0 Z")'
  }}
>
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOyChHzf_X4eX3uPhs36SqthQxno1LQH-9N82Z1U5IQ&s=10"
    alt="Mother loving her daughter"
    className="w-full h-full object-cover"
  />
</div>

              {/* Hand-drawn yellow speech note */}
              <div className="absolute -bottom-4 right-2 sm:-right-4 bg-[#FEF08A] border-2 border-amber-300 px-4 py-3 rounded-2xl shadow-lg text-amber-950 font-bold text-xs sm:text-sm max-w-[190px] rotate-[3deg] z-10 leading-snug">
                <span>"it started like every parent's worry…"</span>
              </div>

              {/* Little pink heart doodle */}
              <div className="absolute -top-3 left-4">
                <HeartDoodle className="w-7 h-7 text-pink-500 rotate-[-12deg]" />
              </div>
            </div>

            {/* Right Column: Mission Content */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <span>🌱</span> WHY WE STARTED
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                From our <span className="text-[#13805B]">home</span> to <span className="text-[#FF387A]">yours</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Like many parents, we struggled to find truly healthy, tasty and transparent food options for our child. Most products were either full of refined sugar, artificial ingredients, or just didn't taste good.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                So we decided to do something about it — to create a new generation of kids' nutrition that is clean, delicious, and backed by science.
              </p>

              {/* Callout Card */}
              <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-orange-200/70 shadow-xs flex items-center gap-4 text-slate-800 text-sm font-semibold mt-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center shrink-0 text-xl text-emerald-700">
                  🌱
                </div>
                <p className="leading-relaxed">
                  What began in our kitchen is now a growing community of <strong className="text-slate-900 font-extrabold">200,000+ happy families</strong> across India.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR PURPOSE - HEALTHIER CHILDREN. HAPPIER TOMORROWS.
         ========================================================================= */}
      <OurPurposeSection />

      {/* =========================================================================
          SECTION 4: BACKED BY EXPERTS - NUTRITION YOU CAN TRUST
         ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Heading & Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <span>🛡️</span> BACKED BY EXPERTS
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Nutrition you can <span className="text-[#13805B]">trust</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our products are thoughtfully formulated with the guidance of pediatricians, nutritionists and food scientists. Every ingredient is chosen for a reason, every recipe is tested for safety, taste and real nutritional value.
              </p>

              <div className="pt-2">
                <Link
                  to="/honest-report"
                  className="inline-flex items-center gap-2 border-2 border-pink-500 hover:bg-pink-50 text-pink-600 font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  <span>See Our Honest Reports</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Center: Pediatrician Doctor Portrait Card */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="w-56 sm:w-64 rounded-3xl overflow-hidden border-2 border-orange-100 shadow-lg bg-white relative">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
                  alt="Dr. Mehta, Pediatrician"
                  className="w-full h-64 object-cover object-top"
                />
                {/* Doctor Note Card */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <p className="italic text-xs text-slate-700 font-semibold leading-relaxed">
                    "Good food today for a stronger tomorrow"
                  </p>
                  <p className="text-pink-600 text-xs font-black mt-1">
                    — Dr. Mehta, <span className="text-slate-500 font-medium">Pediatrician</span>
                  </p>
                </div>
              </div>

              {/* Heart doodle next to doctor */}
              <div className="absolute -bottom-3 -left-3">
                <HeartDoodle className="w-6 h-6 text-pink-400 rotate-[-10deg]" />
              </div>
            </div>

            {/* Right: 5 Vertical Pill Badges */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              {expertBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border shadow-2xs text-xs font-black ${badge.bg}`}
                >
                  <span className="text-base">{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 〰️ SCALLOP DIVIDER 2: Backed by Experts → Stats 〰️ */}
      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="down" color="text-pink-200/90" />
      </div>

      {/* =========================================================================
          SECTION 5: STATS BANNER - REAL FAMILIES. REAL STORIES. REAL IMPACT.
         ========================================================================= */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 my-6">
        <div className="bg-[#FFF0F3] border border-pink-100 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Heart Doodle */}
          <div className="absolute -right-4 -bottom-4 opacity-30 pointer-events-none">
            <HeartDoodle className="w-24 h-24 text-pink-300" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-center md:text-left">
            
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">200K+</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Happy Families</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-2xl mb-1">🥣</div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">2M+</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Healthy Servings</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">4.8/5</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Parent Rating</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-2xl mb-1">💖</div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">100%</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Love &amp; Trust</p>
            </div>

            {/* Hand-written right doodle text */}
            <div className="col-span-2 md:col-span-1 text-center md:text-right flex flex-col items-center md:items-end justify-center">
              <span className="font-handwriting text-sm sm:text-base font-extrabold text-slate-700 italic leading-snug">
                Real Families. <br />
                Real Stories. <br />
                Real Impact. 💖
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 〰️ SCALLOP DIVIDER 3: Stats → Meet the Team 〰️ */}
      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-orange-200/90" />
      </div>

      {/* =========================================================================
          SECTION 6: MEET THE PEOPLE - THE MINDS & HEARTS BEHIND LITTLE JOYS
         ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Eyebrow & Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <span>🎨</span> MEET THE PEOPLE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                The minds &amp; hearts behind <span className="text-[#FF387A]">Little Joys</span><span className="text-[#FF387A]">.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-medium">
                A small but passionate team of parents, doctors, food scientists and dreamers — working together for healthier, happier kids.
              </p>
            </div>

            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 border border-pink-400 text-pink-600 hover:bg-pink-50 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shrink-0 transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>Meet Our Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Circular Portrait Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-200 shadow-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-base font-black text-slate-900 leading-tight group-hover:text-pink-600 transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5 mb-3 block">
                  {member.role}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "{member.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 〰️ SCALLOP DIVIDER 4: Team → Loved by Parents 〰️ */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider 
          direction="up" 
          color="text-orange-300/80" 
          centerBadge={<KidStampBadge text="Loved by 2 Lakh+ Happy Kids" />} 
        />
      </div>

      {/* =========================================================================
          SECTION 7: LOVED BY PARENTS - HAPPY KIDS, HONEST REVIEWS
         ========================================================================= */}
      <ParentReviewsSection bgClass="bg-[#FAF6F0]/60" />

      {/* 〰️ SCALLOP DIVIDER 5: Reviews → Join Our Journey 〰️ */}
      <div className="container mx-auto max-w-5xl px-4 my-2">
        <ScallopDivider direction="up" color="text-amber-300/90" />
      </div>

      {/* =========================================================================
          SECTION 8: BOTTOM BANNER - JOIN OUR JOURNEY TOWARDS A HEALTHIER GENERATION
         ========================================================================= */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 my-16">
        <div className="bg-[#FFFBEB] border-2 flex justify-end items-center border-amber-200/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Left Floating Badge Note */}
          <div className="hidden lg:flex flex-col scale-200 -rotate-20 items-center absolute left-8 top-1/5 text-center">
            <SunDoodle className="w-10 h-10 translate-x-14 translate-y-7 text-amber-400 mb-1 animate-spin duration-3000" />
            <span className="font-handwriting text-center text-sm font-extrabold text-slate-700 italic leading-snug">
              Little <br />
              Steps <br />
              Big <br />
              Futures 💖
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Center Content */}
            <div className="md:col-span-8 md:pl-16 lg:pl-28 text-center  space-y-1">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Join our journey <br className="hidden sm:inline" />
                towards a <span className="text-[#E11D48]">healthier</span> generation
              </h2>

              <p className="text-slate-600 text-sm sm:text-base text-center font-medium ">
                Discover products made with care, for <br /> the people who matter most.
              </p>

              <div className="pt-5">
                <Link
                  to="/shop/all"
                  className="inline-flex items-center gap-2 bg-[#13805B] hover:bg-[#0f6849] text-white font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual: Illustrated Boy Flexing with Crown + Note */}
            <div className="md:col-span-4 flex  md:justify-end gap-3">
              <StrongBoyDoodle className="w-36  h-36 md:translate-y-20 md:translate-x-5 md:scale-150  sm:w-44 sm:h-44 shrink-0" />
              <div className="text-left hidden sm:block">
                <span className="font-handwriting text-sm font-extrabold text-slate-700 italic leading-snug block">
                  Stronger <br />
                  Smarter <br />
                  Happier 💖
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}



// DRY Data Configuration Array
const PURPOSE_CARDS = [
  {
    id: 'nutrition',
    title: 'Better Nutrition',
    description: 'Clean, wholesome ingredients.',
    emoji: '🌱',
    badgeColor: 'bg-emerald-50 border-emerald-200',
    borderColor: 'border-emerald-100'
  },
  {
    id: 'families',
    title: 'Happier Families',
    description: 'More joyful mealtimes.',
    emoji: '💖',
    badgeColor: 'bg-rose-50 border-rose-200',
    borderColor: 'border-rose-100'
  },
  {
    id: 'transparent',
    title: 'Transparent Always',
    description: 'No hidden sugars. No nasties.',
    emoji: '🔬',
    badgeColor: 'bg-indigo-50 border-indigo-200',
    borderColor: 'border-indigo-100'
  },
  {
    id: 'future',
    title: 'A Brighter Future',
    description: 'Healthier kids today, stronger India tomorrow.',
    emoji: '☀️',
    badgeColor: 'bg-amber-50 border-amber-200',
    borderColor: 'border-amber-100'
  }
];

function OurPurposeSection() {
  return (
<section className="relative bg-[#EDFAF4] shadow-xl py-16 sm:py-20 my-10">
      {/* Top & Bottom Scallop Divider Edges */}
      <div className="absolute -top-3.5 sm:-top-5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <ScallopDivider variant="fill" fillColor="#EDFAF4" direction="up" />
      </div>
      <div className="absolute -bottom-3.5 sm:-bottom-5 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <ScallopDivider variant="fill" fillColor="#EDFAF4" direction="down" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
          <span>🌿</span> OUR PURPOSE
        </div>

        {/* Heading with Yellow Wavy Scribble */}
        <div className="inline-block relative mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Healthier Children. Happier Tomorrows.
          </h2>
          <div className="w-48 sm:w-64 mx-auto mt-2">
            <WavyUnderline className="text-amber-400 w-full" />
          </div>
        </div>

        {/* 4 Purpose Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {PURPOSE_CARDS.map(({ id, title, description, emoji, badgeColor, borderColor }) => (
            <div
              key={id}
              className={` backdrop-blur-xs p-6 rounded-3xl border ${borderColor} shadow-xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full`}
            >
              <div>
                <div className={`w-14 h-14 mx-auto rounded-2xl ${badgeColor} border flex items-center justify-center text-2xl mb-4`}>
                  {emoji}
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}