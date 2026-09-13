import React from 'react';
import { Sparkles, Heart, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';

export default function AboutUs() {
  const kidLeaders = [
    {
      name: "Shanaya Wadhwa",
      role: "Chief Growth Officer",
      tagline: "Measures height milestones and ensures we grow taller every season.",
      emoji: "👧"
    },
    {
      name: "RUSHANK PARMAR",
      role: "Chief Taste Officer",
      tagline: "Master taste tester. If it doesn’t taste yum, it doesn’t get made.",
      emoji: "👦"
    },
    {
      name: "Veer Gala",
      role: "Chief Mischief Maker",
      tagline: "Always finding playful new ways to sneak nutrition into snack time.",
      emoji: "🧒"
    },
    {
      name: "Riann Jain",
      role: "Chief Napping Officer",
      tagline: "Guarantees that bedtime magnesium gummies deliver the sweetest dreams.",
      emoji: "👶"
    },
    {
      name: "Reha Mehta",
      role: "Chief Happiness Officer",
      tagline: "Spreads smiles, high-fives, and zero-sugar morning routines.",
      emoji: "👧"
    },
    {
      name: "Naisha Jain",
      role: "Chief Play Officer",
      tagline: "Tests boundless playtime energy fueled by clean sprouted millets.",
      emoji: "🧒"
    }
  ];

  return (
    <div className="bg-[#FFF9F5] min-h-screen pb-20">
      <SEO
        title="About Us - Our Story & Pediatric Nutrition Mission"
        description="Learn how Little Joys crafts clean, pediatrician-formulated kids nutrition with zero refined sugar for 200,000+ families across India."
      />
      {/* HERO SECTION */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 pt-8 pb-12 text-center relative">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-1.5 rounded-full mb-6 border border-pink-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Life is full of little joys…
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-8">
            Life is full of little joys.
          </h1>

          <div className="bg-white/80 backdrop-blur-xs p-8 md:p-10 rounded-3xl border border-pink-100 shadow-sm text-slate-700 text-base md:text-lg leading-relaxed font-medium space-y-4">
            <p>Small moments that make childhood so special.</p>
            <p>Little innocent laughs, and mischievous smiles.</p>
            <p>Little words of kindness and little acts of love.</p>
            <p>Little tears that fall, and tantrums that follow.</p>
            <p>Little jumps of excitement, and endless why’s and why not’s.</p>
            <p>Little questions, little worries, and little discoveries.</p>
            <p className="font-bold text-pink-600">Life is indeed full of little joys!</p>
          </div>
        </div>
      </section>

      {/* OUR STORY / GENESIS Section */}
      <section className="container mx-auto max-w-5xl px-4 md:px-6 my-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-8 md:p-12 border border-orange-100 shadow-sm">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-black uppercase text-[#13805B] tracking-wider">
              The Genesis
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-800">Our Story</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              When we thought of the children from their terrible twos, to their tough twelves, we could only imagine moms and dads running behind their kids to provide all things safe and healthy.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              But in all that madness, they were losing out on the most fun parts of these precious years of growth. <strong>That’s why we started Little Joys.</strong>
            </p>
            <p className="text-slate-800 font-semibold leading-relaxed text-sm md:text-base bg-orange-50/80 p-4 rounded-2xl border border-orange-200/60">
              So that while you create little moments of joy with your children in these years, we can take care of all the science and standards when it comes to health.
            </p>
          </div>

          <div className="md:col-span-4 bg-gradient-to-br from-pink-100 to-amber-100 rounded-3xl p-6 text-center border border-pink-200/60 flex flex-col items-center justify-center">
            <span className="text-6xl mb-3">👨‍👩‍👧‍👦</span>
            <p className="font-black text-slate-800 text-sm">200K+ Families</p>
            <p className="text-xs text-slate-500 mt-1">Trusting Little Joys every morning across India.</p>
          </div>
        </div>
      </section>

      {/* MEET OUR LEADERS Section */}
      <section className="container mx-auto max-w-5xl px-4 md:px-6 my-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase text-pink-600 tracking-wider">The Real Bosses</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-1 mb-4">
            MEET OUR LEADERS
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            At Little Joys, we are nothing without our kids. They are not only our driving force, but are our biggest critics and our favourite customers too. They’re the ones leading this revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {kidLeaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-pink-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-pink-100">
                  {leader.emoji}
                </div>
                <h3 className="text-lg font-black text-slate-800 leading-snug">{leader.name}</h3>
                <span className="text-xs font-black uppercase tracking-wider text-pink-600 block mt-0.5">
                  {leader.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed mt-3">
                  {leader.tagline}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>Executive Team</span>
                <span className="text-emerald-600">✓ Board Member</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & CTA Strip */}
      <section className="container mx-auto max-w-4xl px-4 md:px-6 mt-16 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Ready to bring healthy joy to your home?
          </h2>
          <p className="text-slate-300 text-sm mb-6 max-w-xl mx-auto">
            Discover doctor-formulated Nutrimix, zero-sugar multivitamin gummies, and nourishing superfood spreads.
          </p>
          <Link
            to="/shop/all"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-500/30 transition-transform active:scale-95"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
