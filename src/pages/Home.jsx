import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '@/components/product/ProductCard';
import ScallopDivider from '@/components/common/ScallopDivider';
import { ProductGridSkeleton } from '@/components/common/Skeleton';
import { 
  SunDoodle, 
  StarDoodle,
  RainbowDoodle,
  MiniStarCluster, 
  WavyUnderline, 
  HeartDoodle, 
  KidStampBadge 
} from '@/components/graphics/KidsDoodles';
import { useCartStore } from '@/stores/cartStore';
const PediatricDoctorIllustration = React.lazy(() => import('@/components/graphics/PediatricDoctorIllustration'));
import {
  NutrimixCategorySVG,
  GummiesCategorySVG,
  SpreadsCategorySVG,
  CerealsCategorySVG,
  ProteinCategorySVG,
  BrainHealthCategorySVG,
  ForMomsCategorySVG,
  BestValueCategorySVG
} from '@/components/graphics/CategorySVGs';
const BrandPaymentSection = React.lazy(() => import('@/components/checkout/BrandPaymentSection'));
import SEO from '@/components/common/SEO';
import ParentReviewsSection from '@/components/ParentReviewsSection';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import { HERO_SLIDES, ALL_PRODUCTS } from '@/data/products';
import { productService } from '@/services/productService';

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
  const ctxCartItems = useCartStore((s) => s.cartItems);
  const ctxAddToCart = useCartStore((s) => s.addToCart);
  const ctxUpdateQty = useCartStore((s) => s.updateQuantity);
  const effectiveCartItems = cartItems?.length ? cartItems : ctxCartItems || [];
  const handleAdd = onAddToCart || ctxAddToCart;
  const handleUpdateQty = onUpdateCartQuantity || ctxUpdateQty;

  const [activeCategory, setActiveCategory] = useState('All');
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Swiper Hero Carousel Refs & State
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [allProducts, setAllProducts] = useState(ALL_PRODUCTS);
  const heroPrevRef = useRef(null);
  const heroNextRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    productService.getHeroSlides().then((res) => {
      if (isMounted && Array.isArray(res)) setSlides(res);
    });
    productService.getAllProducts().then((res) => {
      if (isMounted && Array.isArray(res)) setAllProducts(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryChange = (tab) => {
    if (tab === activeCategory) return;
    setIsCategoryLoading(true);
    setActiveCategory(tab);
    setTimeout(() => {
      setIsCategoryLoading(false);
    }, 220);
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
  const productList = Array.isArray(allProducts) ? allProducts : [];
  const topFavourites = productList.slice(0, 8);

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
    : productList.filter((p) => p.category === activeCategory || p.subCategory?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-brand-cream min-h-screen pb-20 sm:pb-16">
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

      {/* 1. HERO SLIDER SECTION (PREMIUM EDITORIAL HERO POWERED BY SWIPER.JS) */}
      <section className="pt-2 sm:pt-4 md:pt-6 pb-2 px-2.5 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative group">
            {/* Left Chevron Button (Hidden on mobile touch screens, visible on sm+) */}
            <button 
              ref={heroPrevRef}
              aria-label="Previous Slide"
              className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-xs border border-white/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>

            {/* Right Chevron Button (Hidden on mobile touch screens, visible on sm+) */}
            <button 
              ref={heroNextRef}
              aria-label="Next Slide"
              className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-xs border border-white/80 shadow-md items-center justify-center transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, el: '.hero-swiper-pagination' }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = heroPrevRef.current;
                swiper.params.navigation.nextEl = heroNextRef.current;
              }}
              grabCursor={true}
              className="hero-swiper rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-amber-200/60 shadow-xs overflow-hidden"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={slide.id || idx}>
                  <div className="w-full bg-linear-to-br from-[#FFFDF9] via-[#FFF0F7] to-brand-primary-50 py-5 sm:py-8 md:py-12 px-3.5 sm:px-8 md:px-14 relative overflow-hidden">
                    {/* Subtle Little Joys Doodles */}
                    <SunDoodle className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400/70 absolute -top-1 -right-1 sm:top-3 sm:right-6 pointer-events-none" />
                    <RainbowDoodle className="w-8 h-5 text-rose-300/60 opacity-60 absolute top-4 left-6 sm:left-8 pointer-events-none hidden sm:block" />
                    <StarDoodle className="w-3.5 h-3.5 text-amber-400/60 absolute bottom-6 right-1/2 pointer-events-none hidden lg:block" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center relative z-10">
                      {/* Left Editorial Text Column */}
                      <div className="lg:col-span-7 text-center lg:text-left space-y-2.5 sm:space-y-4">
                        {/* Micro-Pill SaaS Badge with Live Pulse */}
                        <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 sm:px-3 py-1 rounded-full border border-amber-200/70 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="text-xs">{slide.badgeEmoji || "🌿"}</span>
                          <span className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
                            {slide.badge}
                          </span>
                        </div>

                        {/* Primary Headline */}
                        <h2 className="text-[22px] xs:text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.14]">
                          {slide.title}<br />
                          <span className="text-brand-primary relative inline-block">
                            {slide.highlight}
                            <WavyUnderline className="w-20 sm:w-24 h-1.5 text-pink-300/80 absolute -bottom-1 left-0 pointer-events-none" />
                          </span>
                        </h2>

                        {/* Description */}
                        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
                          {slide.subtitle}
                        </p>

                        {/* SaaS Proof Chips */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-0.5 sm:pt-1 text-[11px] sm:text-xs font-semibold text-slate-700">
                          {slide.benefits?.map((benefit, bIdx) => (
                            <span 
                              key={bIdx} 
                              className="inline-flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-slate-200/70 shadow-2xs text-slate-700"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                              <span className="leading-tight">{benefit}</span>
                            </span>
                          ))}
                        </div>

                        {/* Action CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
                          <Link
                            to={slide.ctaLink || "/shop/all"}
                            className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold py-2.5 sm:py-3 px-6 sm:px-7 rounded-full text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-brand-primary/20 flex items-center justify-center gap-2 min-h-10.5 sm:min-h-11 group/btn"
                          >
                            <span>{slide.ctaText || "Shop Breakfast"}</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>

                          <Link
                            to="/honest-report"
                            className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs min-h-10.5 sm:min-h-11 active:scale-95"
                          >
                            <ShieldCheck className="w-4 h-4 text-brand-primary" />
                            <span>View Lab Report</span>
                          </Link>
                        </div>
                      </div>

                      {/* Right Hero Product Showcase */}
                      <div className="lg:col-span-5 flex justify-center items-center relative py-2 sm:py-4 lg:py-0">
                        {/* Soft Ambient Pedestal Glow */}
                        <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-amber-200/35 blur-3xl pointer-events-none z-0" />

                        {/* Main Floating Product Showcase */}
                        <div className="relative z-10 group/img flex flex-col items-center">
                          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-xl shadow-amber-950/10 border border-amber-100/60 bg-white/40 backdrop-blur-xs">
                            <ResponsiveImage 
                              src={slide.image} 
                              alt={slide.productName || slide.title}
                              loading={idx === 0 ? "eager" : "lazy"}
                              fetchPriority={idx === 0 ? "high" : "auto"}
                              decoding={idx === 0 ? "sync" : "async"}
                              width={380}
                              height={340}
                              sizes="(max-width: 640px) 260px, 360px"
                              className="w-56 xs:w-64 sm:w-72 md:w-80 h-48 xs:h-56 sm:h-68 md:h-72 object-cover transition-transform duration-500 hover:scale-103"
                            />
                          </div>

                          {/* Floating Social Proof Badge */}
                          <div className="absolute -bottom-2.5 sm:-bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md border border-amber-100 flex items-center gap-1.5 z-20 whitespace-nowrap">
                            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-[11px] sm:text-xs font-black text-slate-900">{slide.rating || "4.8"}</span>
                            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">• {slide.reviewCount || "2,140+"} parents</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Bottom Pagination Container for Swiper */}
            <div className="hero-swiper-pagination flex justify-center items-center gap-1.5 pt-2" />
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
      <section className="py-6 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-primary tracking-wider">
                  Discover By Need
                </span>
                <MiniStarCluster className="text-amber-400" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-3xl font-black text-slate-900 mt-0.5 flex items-center gap-1.5 sm:gap-2">
                <span>Explore Our Categories</span>
                <SunDoodle className="w-6 h-6 text-amber-400 inline-block -mt-1" />
              </h2>
            </div>
            <Link
              to="/shop/all"
              className="text-[11px] sm:text-xs font-black text-brand-primary hover:underline flex items-center gap-1 bg-white px-2.5 sm:px-3.5 py-1.5 rounded-full border border-orange-100 shadow-2xs"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Uniform Category Cards with Custom Vector SVGs */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 md:gap-4">
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
                    <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-brand-berry text-white text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                      {cat.badge}
                    </span>
                  )}

                  {/* Custom Vector SVG Icon with Ambient Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-1.5 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-xs">
                    <Icon className="w-full h-full" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 w-full">
                    <span className="text-[11px] sm:text-xs md:text-sm font-black text-slate-900 block group-hover:text-brand-primary transition-colors leading-tight truncate">
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
      <section className="py-6 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-linear-to-br from-white to-brand-primary-50/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 border border-emerald-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center gap-3.5 px-2">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0 border border-emerald-100">
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
      <section className="py-6 md:py-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-primary tracking-wider">
                Most Loved Products
              </span>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                <span>Top-Selling Favourites</span>
              </h2>
              <WavyUnderline className="w-32 h-2.5 text-pink-300 mt-1" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none touch-scroll -mx-1 px-1">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleCategoryChange(tab)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all min-h-9 cursor-pointer ${
                    activeCategory === tab
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25'
                      : 'bg-white text-slate-700 hover:bg-orange-50 border border-orange-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 2 Columns on Mobile, 4 Columns on Desktop with Shimmer Skeleton Loading */}
          {isCategoryLoading ? (
            <ProductGridSkeleton count={4} cols="grid-cols-2 lg:grid-cols-4" />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 animate-in fade-in duration-200">
              {displayedProducts.map((product) => {
                const inCart = effectiveCartItems.find(
                  (c) =>
                    String(c.id) === String(product.id) ||
                    (c.slug && product.slug && String(c.slug) === String(product.slug))
                );
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
          )}
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
      <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950/60 text-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800/90">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Left Column: Assessment Copy & CTAs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 bg-brand-primary/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border border-brand-primary/40 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Takes Only 2 Minutes • 100% Free</span>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-[2.6rem] font-black leading-tight text-white tracking-tight">
                  Not sure what nutrition your child is missing?
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium">
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
                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-hover text-white font-black py-3.5 sm:py-4 px-7 sm:px-9 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-brand-primary/35 transition-all transform active:scale-95 flex items-center justify-center gap-2.5 min-h-11"
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

                <React.Suspense fallback={<div className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-64 skeleton-shimmer rounded-3xl" />}>
                  <PediatricDoctorIllustration className="w-full max-w-xs sm:max-w-sm lg:max-w-md drop-shadow-2xl hover:scale-120 scale-118 md:translate-y-10 md:translate-x-1 transition-transform duration-500" />
                </React.Suspense>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. HONEST REPORTS: TESTED & CERTIFIED (SCANNABLE MICRO-STATS) */}
      <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-primary bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Radical Transparency
            </span>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              Honest Reports: Tested &amp; Certified
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Every production batch is tested by independent NABL-accredited laboratories. We publish full test certificates for every parent to inspect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shadow-xs">
                🛡️
              </div>
              <h3 className="text-base font-black text-slate-900">Heavy Metal Screened</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tested for Lead, Mercury, Arsenic, and Cadmium with reports strictly below 0.01 ppm detection limit.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>&lt;0.01 ppm Heavy Metals</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>NABL Lab Certified Batch-Wise</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-xs">
                🍯
              </div>
              <h3 className="text-base font-black text-slate-900">Zero Refined Sugar</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Clean sweetness exclusively derived from organic Dhampur jaggery, raw dates, and natural fruit pulp.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>0% White Refined Sugar</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>100% Dhampur Organic Jaggery</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-xs hover:border-brand-primary transition-colors space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-primary flex items-center justify-center text-xl shadow-xs">
                👩‍⚕️
              </div>
              <h3 className="text-base font-black text-slate-900">Pediatrician Endorsed</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Co-created with pediatric doctors according to ICMR Recommended Dietary Allowances for Indian kids.
              </p>
              <div className="pt-2 space-y-1 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>100% Daily ICMR Dosages</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>Clinically Reviewed &amp; Safe</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/honest-report"
              className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-brand-primary font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-emerald-200 shadow-xs transition-colors min-h-11"
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
            <div className="flex items-center gap-1.5 text-[11px] font-black text-brand-berry bg-white px-3.5 py-0.5 rounded-full border border-pink-200/80 shadow-2xs">
              <HeartDoodle className="w-3.5 h-3.5 text-brand-berry" />
              <span>Real Stories From Real Parents</span>
            </div>
          } 
        />
      </div>

      {/* 7. PARENT TESTIMONIALS & REVIEWS (EMOTIONAL WARMTH) */}
      <ParentReviewsSection />

      {/* 8. FAQ ACCORDION (QUIET & STRONG CONTRAST) */}
      <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-6 space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-primary">
              Common Questions
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer ${
                    isOpen ? 'border-brand-primary shadow-sm' : 'border-orange-100/90 shadow-2xs hover:border-slate-300'
                  }`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-xs sm:text-sm flex items-center gap-2.5 ${
                      isOpen ? 'font-black text-slate-900' : 'font-bold text-slate-800'
                    }`}>
                      <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-brand-primary' : 'text-slate-400'}`} />
                      <span>{faq.q}</span>
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-brand-primary' : ''
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
      <React.Suspense fallback={<div className="container mx-auto max-w-6xl px-4 py-8"><div className="w-full h-48 skeleton-shimmer rounded-3xl" /></div>}>
        <BrandPaymentSection />
      </React.Suspense>
    </div>
  );
}
