import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ScallopDivider from '../components/ScallopDivider';
import { 
  SunDoodle, 
  MiniStarCluster, 
  WavyUnderline, 
  HeartDoodle, 
  KidStampBadge 
} from '../components/KidsDoodles';
import { useCart } from '../context/CartContext';
import PediatricDoctorIllustration from '../components/PediatricDoctorIllustration';
import {
  NutrimixCategorySVG,
  GummiesCategorySVG,
  SpreadsCategorySVG,
  CerealsCategorySVG,
  ProteinCategorySVG,
  BrainHealthCategorySVG,
  ForMomsCategorySVG,
  BestValueCategorySVG
} from '../components/CategorySVGs';
import BrandPaymentSection from '../components/BrandPaymentSection';
import SEO from '../components/SEO';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HERO_SLIDES, ALL_PRODUCTS } from '../data/products';
import dbService from '../services/dbService';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Clock, 
  HelpCircle, 
  ChevronDown,
  Stethoscope,
  Smile,
  Heart,
  Check
} from 'lucide-react';

export default function Home({ onAddToCart, cartItems = [], onUpdateCartQuantity }) {
  const navigate = useNavigate();
  const { cartItems: ctxCartItems, addToCart: ctxAddToCart, updateQuantity: ctxUpdateQty } = useCart();
  const effectiveCartItems = cartItems?.length ? cartItems : ctxCartItems || [];
  const handleAdd = onAddToCart || ctxAddToCart;
  const handleUpdateQty = onUpdateCartQuantity || ctxUpdateQty;

  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(0);

  // Hero carousel state
  const slides = HERO_SLIDES.length ? HERO_SLIDES : dbService.getHeroSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Auto-slide effect (changes slide every 4.5s unless hovered)
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // 8 Dedicated Little Joys Categories with Custom Hand-Crafted SVGs
  const homeCategories = [
    {
      id: 'nutrimix',
      name: 'Nutrimix',
      subtitle: 'Sprouted Millets',
      link: '/shop/nutrimix',
      icon: NutrimixCategorySVG,
      bg: 'bg-gradient-to-b from-amber-50/90 to-white border-amber-200/90 hover:border-amber-400',
      badge: 'BESTSELLER'
    },
    {
      id: 'gummies',
      name: 'Gummies',
      subtitle: '12 Essential Vitamins',
      link: '/shop/gummies',
      icon: GummiesCategorySVG,
      bg: 'bg-gradient-to-b from-pink-50/90 to-white border-pink-200/90 hover:border-pink-400',
      badge: 'ZERO SUGAR'
    },
    {
      id: 'spreads',
      name: 'Spreads & Sauce',
      subtitle: 'Jaggery & Hazelnut',
      link: '/shop/spreads-and-sauce',
      icon: SpreadsCategorySVG,
      bg: 'bg-gradient-to-b from-amber-50/90 to-white border-orange-200/90 hover:border-orange-400',
      badge: null
    },
    {
      id: 'cereals',
      name: 'Cereals & Snacks',
      subtitle: 'Millet Stars',
      link: '/shop/cereals-and-snacks',
      icon: CerealsCategorySVG,
      bg: 'bg-gradient-to-b from-sky-50/90 to-white border-sky-200/90 hover:border-sky-400',
      badge: 'CRUNCHY'
    },
    {
      id: 'protein',
      name: 'Protein & Fibre',
      subtitle: 'Immunity Kits',
      link: '/shop/protein',
      icon: ProteinCategorySVG,
      bg: 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-200/90 hover:border-emerald-400',
      badge: 'ACTIVE 4+'
    },
    {
      id: 'brain-health',
      name: 'Brain Health',
      subtitle: 'Plant DHA & B12',
      link: '/shop/all?category=Brain%20Health%20Support',
      icon: BrainHealthCategorySVG,
      bg: 'bg-gradient-to-b from-indigo-50/90 to-white border-indigo-200/90 hover:border-indigo-400',
      badge: null
    },
    {
      id: 'for-moms',
      name: 'For Moms',
      subtitle: 'Postpartum & Energy',
      link: '/shop/moms',
      icon: ForMomsCategorySVG,
      bg: 'bg-gradient-to-b from-rose-50/90 to-white border-rose-200/90 hover:border-rose-400',
      badge: 'CARE'
    },
    {
      id: 'best-value',
      name: 'Best Value',
      subtitle: 'Saver Multipacks',
      link: '/shop/best-value',
      icon: BestValueCategorySVG,
      bg: 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-200/90 hover:border-emerald-400',
      badge: 'SAVE 25%'
    }
  ];

  // Top-selling favourites matching the product catalog with real images
  const topFavourites = ALL_PRODUCTS.slice(0, 8);

  // Emotional, authentic parent testimonials
  const testimonials = [
    {
      title: "Milk time tantrums are finally over!",
      quote: "My 4-year-old Kabir would run away from regular milk. Nutrimix chocolate smells like real roasted cocoa and he finishes his tumbler in 2 minutes flat! Knowing it has sprouted ragi and zero white sugar gives me total peace of mind.",
      author: "Ritu Verma",
      location: "Bhopal, MP",
      child: "Mother of 4-year-old Kabir",
      avatarBg: "bg-pink-100 text-[#FF2F92]",
      product: "Nutrimix Chocolate (350g)",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    },
    {
      title: "Clean formulation with zero heavy metals",
      quote: "Being a pediatrician myself, I inspect lab reports religiously before giving anything to my daughter. Zero heavy metals, pectin-based, and no synthetic dyes. Ananya reminds me every single morning for her gummy!",
      author: "Dr. Sameer Joshi",
      location: "Mumbai, MH",
      child: "Father of 5-year-old Ananya",
      avatarBg: "bg-emerald-100 text-[#13805B]",
      product: "Multivitamin Gummies 4+",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    },
    {
      title: "Noticeable boost in immunity & school stamina",
      quote: "Both my kids have been having the morning immunity duo for over 3 months now. They stay energized through school hours and handle weather changes without frequent coughs. Truly grateful for honest Indian nutrition.",
      author: "Kavita Deshmukh",
      location: "Pune, MH",
      child: "Mother of 4 & 7 yr old",
      avatarBg: "bg-amber-100 text-amber-800",
      product: "Immunity Support Kit",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    }
  ,
    {
      title: "Milk time tantrums are finally over!",
      quote: "My 4-year-old Kabir would run away from regular milk. Nutrimix chocolate smells like real roasted cocoa and he finishes his tumbler in 2 minutes flat! Knowing it has sprouted ragi and zero white sugar gives me total peace of mind.",
      author: "Ritu Verma",
      location: "Bhopal, MP",
      child: "Mother of 4-year-old Kabir",
      avatarBg: "bg-pink-100 text-[#FF2F92]",
      product: "Nutrimix Chocolate (350g)",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    },
    {
      title: "Clean formulation with zero heavy metals",
      quote: "Being a pediatrician myself, I inspect lab reports religiously before giving anything to my daughter. Zero heavy metals, pectin-based, and no synthetic dyes. Ananya reminds me every single morning for her gummy!",
      author: "Dr. Sameer Joshi",
      location: "Mumbai, MH",
      child: "Father of 5-year-old Ananya",
      avatarBg: "bg-emerald-100 text-[#13805B]",
      product: "Multivitamin Gummies 4+",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    },
    {
      title: "Noticeable boost in immunity & school stamina",
      quote: "Both my kids have been having the morning immunity duo for over 3 months now. They stay energized through school hours and handle weather changes without frequent coughs. Truly grateful for honest Indian nutrition.",
      author: "Kavita Deshmukh",
      location: "Pune, MH",
      child: "Mother of 4 & 7 yr old",
      avatarBg: "bg-amber-100 text-amber-800",
      product: "Immunity Support Kit",
      avatar:"https://imgs.search.brave.com/OuURRpveRL_bEUxvaB3_As_VVRFU7pJbiMFPCpiRlH4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjM2NTQzOS9waG90/by9zb24taXMta2lz/c2luZy1oaXMtbW90/aGVyLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1qUGJtU3hz/QlJxY0pqQjF4d1Fu/eVJhTlU2OTY4S1Fu/Y2Y5Qmd2cUNIUENz/PQ"
    }
  ];


  // FAQ list with clear, high-contrast answers
  const faqs = [
    {
      q: "What age group is Little Joys Nutrimix suitable for?",
      a: "Our Nutrimix powders are calibrated for toddlers & growing kids (aged 2 to 6 years, and 7-12 years). Each serving delivers 100% of the daily RDA of essential vitamins, minerals, calcium, and iron recommended by the Indian Council of Medical Research (ICMR)."
    },
    {
      q: "Is there any refined white sugar in your products?",
      a: "Zero refined white sugar. We strictly ban maltodextrin, high-fructose corn syrup, and artificial sweeteners. Our Nutrimix is naturally sweetened with organic Dhampur jaggery, and gummies are made with 100% natural fruit pulp."
    },
    {
      q: "Are the gummies safe for daily consumption?",
      a: "Yes! Little Joys Multivitamin and Brain DHA Gummies are gelatin-free, 100% vegetarian pectin-based, and designed specifically for daily nutritional support without stressing young digestive systems."
    },
    {
      q: "How can I verify the lab test reports for heavy metals?",
      a: "We believe in radical transparency. Visit our 'Honest Reports' section to view and download full batch-wise third-party NABL-accredited lab test reports for Lead, Mercury, Arsenic, and Cadmium safety."
    }
  ];

  const categoryTabs = [
    "All",
    "Nutrimix",
    "Gummies",
    "Best Value",
    "Spreads & Sauce",
    "Cereals & Snacks",
    "For Moms"
  ];

  const displayedProducts = activeCategory === 'All'
    ? topFavourites
    : ALL_PRODUCTS.filter((p) => p.category === activeCategory || p.subCategory?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#FFF9F5] min-h-screen pb-16">
      {/* Dynamic Programmatic SEO & Structured Data */}
      <SEO
        title="Little Joys | Expert-Formulated Nutrition & Wellness For Kids"
        description="India's #1 Pediatrician-backed nutrition brand for kids. Shop Nutrimix sprouted millets, 12 essential multivitamin gummies, brain health kits & clean treats with zero refined sugar."
        keywords="kids nutrition, sprouted millets, multivitamin gummies for kids, pediatric nutrition India, children health drink, clean ragi chocolate drink, Little Joys"
        canonical="https://ourlittlejoys.com/"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }}
      />

      {/* Primary Semantic H1 for SEO & Screen Readers */}
      <h1 className="sr-only">
        Little Joys - Expert-Formulated Pediatric Nutrition &amp; Daily Wellness For Kids
      </h1>

      {/* 1. HERO SLIDER SECTION (4-5 SLIDING PROMOTIONAL CARDS) */}
      <section className="pt-4 md:pt-6 pb-2 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div 
            className="relative overflow-hidden rounded-3xl md:rounded-[3rem] border border-orange-200/70 shadow-xs group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Sliding Track */}
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, idx) => (
                <div 
                  key={slide.id || idx}
                  className="w-full shrink-0 bg-gradient-to-r from-pink-50/90 via-amber-50/50 to-orange-50/70 p-6 sm:p-8 md:p-12 relative"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Left Text Content */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-4">
                      {/* Trust Badge */}
                      <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-orange-200/80 shadow-xs">
                        <span className="text-base">{slide.badgeEmoji || "🌿"}</span>
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                          {slide.badge}
                        </span>
                        {slide.tag && (
                          <span className="bg-[#13805B] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                            {slide.tag}
                          </span>
                        )}
                      </div>

                      {/* Primary Headline */}
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        {slide.title}<br />
                        <span className="text-[#13805B] underline decoration-wavy decoration-pink-300">
                          {slide.highlight}
                        </span>
                      </h2>

                      {/* Description (14-16px readable body) */}
                      <p className="text-sm sm:text-base text-slate-600 max-w-lg font-medium leading-relaxed">
                        {slide.subtitle}
                      </p>

                      {/* Benefit Check Pills */}
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs font-bold text-slate-700">
                        {slide.benefits?.map((benefit, bIdx) => (
                          <span key={bIdx} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-orange-100 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-[#13805B]" /> {benefit}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                        <Link
                          to={slide.ctaLink || "/shop/all"}
                          className="w-full sm:w-auto bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-3.5 px-8 rounded-full text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#13805B]/25 flex items-center justify-center gap-2"
                        >
                          <span>{slide.ctaText || "Shop Now"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          to="/honest-report"
                          className="w-full sm:w-auto bg-white hover:bg-orange-50 text-slate-800 border border-slate-200 font-bold py-3.5 px-6 rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#13805B]" />
                          <span>View Lab Reports</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Hero Product Showcase (Real-world presentation) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-xs md:max-w-sm aspect-square bg-gradient-to-tr from-orange-100/90 via-white to-amber-100/80 rounded-[2.5rem] p-5 shadow-xl flex flex-col items-center justify-between border-4 border-white overflow-hidden group-hover:scale-101 transition-transform">
                        
                        {/* Rating pill top row */}
                        <div className="w-full flex justify-between items-center z-10">
                          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-black px-3 py-1 rounded-full shadow-xs border border-orange-100 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{slide.rating || "4.8"}</span>
                            <span className="text-slate-500 font-medium">({slide.reviewCount || "4.6k+"})</span>
                          </span>

                          <span className="bg-[#13805B] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Verified
                          </span>
                        </div>

                        {/* Real-World Product Showcase on soft pedestal */}
                        <div className="w-full h-48 md:h-52 flex items-center justify-center my-auto overflow-hidden rounded-2xl relative">
                          <div className="absolute inset-0 bg-radial from-amber-200/30 to-transparent rounded-full blur-xl pointer-events-none" />
                          <img 
                            src={slide.image} 
                            alt={slide.productName || slide.title}
                            loading={idx === 0 ? "eager" : "lazy"}
                            fetchPriority={idx === 0 ? "high" : "auto"}
                            decoding={idx === 0 ? "sync" : "async"}
                            width="320"
                            height="320"
                            className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-500 hover:scale-105 relative z-10"
                          />
                        </div>

                        {/* Bottom product title & clean ingredient story */}
                        <div className="mt-2 text-center bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-xs border border-orange-100 w-full z-10">
                          <span className="text-[#13805B] font-black text-xs sm:text-sm block truncate">
                            {slide.productName || "Little Joys Daily Nutrition"}
                          </span>
                          <span className="text-[11px] text-slate-500 font-bold block truncate">
                            {slide.productMeta || "Zero Refined Sugar • Lab Tested"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Chevron Button */}
            <button 
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-orange-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            {/* Right Chevron Button */}
            <button 
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-orange-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

            {/* Dot Pagination Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-orange-100/70 shadow-xs">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentSlide === idx 
                      ? 'w-7 bg-[#13805B]' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 〰️ STRATEGIC SCALLOP DIVIDER 1: Hero → Categories 〰️ */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider 
          direction="up" 
          color="text-orange-300/80" 
          centerBadge={<KidStampBadge text="Loved by 2 Lakh+ Happy Kids" />} 
        />
      </div>

      {/* 2. EXPLORE OUR CATEGORIES (CONSISTENT VISUAL CARDS) */}
      <section className="py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase text-[#13805B] tracking-wider">
                  Discover By Need
                </span>
                <MiniStarCluster className="text-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Explore Our Categories</span>
                <SunDoodle className="w-6 h-6 text-amber-400 inline-block -mt-1" />
              </h2>
            </div>
            <Link
              to="/shop/all"
              className="text-xs font-black text-[#13805B] hover:underline flex items-center gap-1 bg-white px-3.5 py-1.5 rounded-full border border-orange-100 shadow-2xs"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Uniform Category Cards with Custom Vector SVGs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {homeCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={cat.link}
                  className={`relative rounded-3xl p-3 sm:p-3.5 text-center border transition-all duration-300 group flex flex-col justify-between items-center h-full shadow-2xs hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden ${cat.bg}`}
                >
                  {/* Optional Mini Badge */}
                  {cat.badge && (
                    <span className="absolute top-2 right-2 bg-[#FF2F92] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-2xs">
                      {cat.badge}
                    </span>
                  )}

                  {/* Custom Vector SVG Icon with Ambient Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-1.5 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-xs">
                    <Icon className="w-full h-full" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 w-full">
                    <span className="text-xs sm:text-sm font-black text-slate-900 block group-hover:text-[#13805B] transition-colors leading-tight truncate">
                      {cat.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold block truncate">
                      {cat.subtitle}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BRAND TRUST PILLARS (Clean whitespace separation, no repetitive divider) */}
      <section className="py-6 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl p-5 md:p-7 border border-emerald-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 md:divide-x md:divide-slate-100">
            <div className="flex items-center gap-3.5 px-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#13805B] flex items-center justify-center shrink-0 border border-emerald-100">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Developed by</span>
                <span className="text-sm md:text-base font-black text-slate-900">EXPERTS</span>
                <p className="text-xs text-slate-500">Pediatrician-formulated ICMR dosages</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-2 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Tasted by</span>
                <span className="text-sm md:text-base font-black text-slate-900">KIDS</span>
                <p className="text-xs text-slate-500">Yummy real cocoa &amp; fruit pectin</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-2 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Approved by</span>
                <span className="text-sm md:text-base font-black text-slate-900">PARENTS</span>
                <p className="text-xs text-slate-500">Over 2,00,000+ happy Indian families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP-SELLING FAVOURITES (HIGH-ENERGY PRODUCT SHOWCASE) */}
      <section className="py-6 md:py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-black uppercase text-[#13805B] tracking-wider">
                Most Loved Products
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Top-Selling Favourites</span>
              </h2>
              <WavyUnderline className="w-32 h-2.5 text-pink-300 mt-1" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === tab
                      ? 'bg-[#13805B] text-white shadow-md shadow-[#13805B]/25'
                      : 'bg-white text-slate-700 hover:bg-orange-50 border border-orange-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 2 Columns on Mobile, 4 Columns on Desktop with Enhanced Image Area */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayedProducts.map((product) => {
              const inCart = effectiveCartItems.find((c) => c.id === product.id || c.slug === product.slug);
              return (
                <ProductCard
                  key={product.id}
                  {...product}
                  cartQuantity={inCart ? inCart.quantity : 0}
                  onAddToCart={handleAdd}
                  onUpdateCartQuantity={handleUpdateQty}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 〰️ STRATEGIC SCALLOP DIVIDER 2: Products → Assessment 〰️ */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider 
          direction="down" 
          color="text-orange-300/80" 
        />
      </div>

      {/* 5. PEDIATRIC HEALTH ASSESSMENT BANNER (DOCTOR-BACKED AUTHORITY WITH CUSTOM SVG) */}
      <section className="py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 text-white rounded-3xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800/90">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Assessment Copy & CTAs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#13805B]/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#13805B]/40 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Takes Only 2 Minutes • 100% Free</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black leading-tight text-white tracking-tight">
                  Not sure what nutrition your child is missing?
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                  Take our 2-minute <strong className="text-emerald-400 font-black">Doctor-Backed Pediatric Health Assessment</strong> to receive a tailored daily nutrition roadmap calibrated to your child's age, growth milestones, and eating habits.
                </p>

                {/* 3 Quick Evidence Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-bold text-slate-300">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span>100% ICMR Dosages</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span>Personalized Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span>Pediatrician Approved</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => navigate('/shop/all')}
                    className="w-full sm:w-auto bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-4 px-9 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#13805B]/35 transition-all transform active:scale-95 flex items-center justify-center gap-2.5"
                  >
                    <span>Start Free Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-slate-400 font-semibold">
                    ★ 4.9/5 by 25,000+ Indian Parents
                  </span>
                </div>
              </div>

              {/* Right Column: High-Fidelity Pediatrician Doctor SVG Illustration */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
                {/* Background Ambient Glow */}
                <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none -z-10" />

                <PediatricDoctorIllustration className="w-full max-w-xs sm:max-w-sm lg:max-w-md drop-shadow-2xl hover:scale-102 transition-transform duration-500" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. HONEST REPORTS: TESTED & CERTIFIED (SCANNABLE MICRO-STATS) */}
      <section className="py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#13805B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Radical Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Honest Reports: Tested &amp; Certified
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Every production batch is tested by independent NABL-accredited laboratories. We publish full test certificates for every parent to inspect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shadow-xs">
                🛡️
              </div>
              <h3 className="text-base font-black text-slate-900">Heavy Metal Screened</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tested for Lead, Mercury, Arsenic, and Cadmium with reports strictly below 0.01 ppm detection limit.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>&lt;0.01 ppm Heavy Metals</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>NABL Lab Certified Batch-Wise</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-xs">
                🍯
              </div>
              <h3 className="text-base font-black text-slate-900">Zero Refined Sugar</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Clean sweetness exclusively derived from organic Dhampur jaggery, raw dates, and natural fruit pulp.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>0% White Refined Sugar</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>100% Dhampur Organic Jaggery</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#13805B] flex items-center justify-center text-xl shadow-xs">
                👩‍⚕️
              </div>
              <h3 className="text-base font-black text-slate-900">Pediatrician Endorsed</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Co-created with pediatric doctors according to ICMR Recommended Dietary Allowances for Indian kids.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>100% Daily ICMR Dosages</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Clinically Reviewed &amp; Safe</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/honest-report"
              className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-[#13805B] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-emerald-200 shadow-xs transition-colors"
            >
              <span>Search Your Product Batch Code</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 〰️ STRATEGIC SCALLOP DIVIDER 3: Trust → Reviews 〰️ */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider 
          direction="up" 
          color="text-pink-300/80" 
          centerBadge={
            <div className="flex items-center gap-1.5 text-[11px] font-black text-[#FF2F92] bg-white px-3.5 py-0.5 rounded-full border border-pink-200/80 shadow-2xs">
              <HeartDoodle className="w-3.5 h-3.5 text-[#FF2F92]" />
              <span>Real Stories From Real Parents</span>
            </div>
          } 
        />
      </div>

      {/* 7. PARENT TESTIMONIALS & REVIEWS (EMOTIONAL WARMTH) */}
      <section className="py-6 md:py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF2F92] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Happy Kids, Honest Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Hear from Real Parents
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Over 200,000+ mothers and fathers trust Little Joys for their child's daily nutrition.
            </p>
          </div>

          <div className="relative">
            {/* Custom Navigation buttons on header right */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                id="testimonial-prev"
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-[#13805B] hover:text-white hover:border-[#13805B] active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="testimonial-next"
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-[#13805B] hover:text-white hover:border-[#13805B] active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
              }}
              autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '#testimonial-prev',
                nextEl: '#testimonial-next'
              }}
              loop={true}
              grabCursor={true}
              className="testimonials-swiper !pb-12"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx} className="!h-auto flex">
                  <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs flex flex-col justify-between w-full h-full space-y-4 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>

                      <h3 className="text-base font-black text-slate-900 leading-snug">
                        "{t.title}"
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {t.quote}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar}
                          alt={t.author}
                          className="w-10 h-10 bg-amber-50 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-black text-slate-900 block truncate max-w-[130px]">
                            {t.author}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold block truncate max-w-[130px]">
                            {t.child} • {t.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-[#13805B] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION (QUIET & STRONG CONTRAST) */}
      <section className="py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-6 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#13805B]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    isOpen ? 'border-[#13805B] shadow-sm' : 'border-orange-100/90 shadow-2xs hover:border-slate-300'
                  }`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-xs sm:text-sm flex items-center gap-2.5 ${
                      isOpen ? 'font-black text-slate-900' : 'font-bold text-slate-800'
                    }`}>
                      <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#13805B]' : 'text-slate-400'}`} />
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-[#13805B]' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PAYMENT PARTNERS & BRAND SIGNATURE WITH SVG BOY */}
      <BrandPaymentSection />
    </div>
  );
}
